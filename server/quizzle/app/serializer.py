from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from django.contrib.auth.hashers import make_password

from .models import Creator, Attendee
from .models import Quiz, Question, Option
from .models import Answer, AnswerQuestions

from .validations import validate_name, validate_email, validate_mobile, validate_password
from .validations import validate_title, validate_difficulty
from .validations import validate_question, validate_points, validate_correct, validate_option

#----------------------------------------------------#
#----------------- USER SERIALIZERS -----------------#
#----------------------------------------------------#

class RegisterCreatorSerializer(ModelSerializer):
    name = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Name Must Be Provided", 
            "blank": "Name Must Be Provided" 
        },
        validators=[validate_name]
    )
    
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators=[validate_email]
    )
    
    mobile = serializers.CharField(
        required=False,
        allow_blank=True,
        error_messages={ 
            "required": "Mobile Number Must Be Provided", 
            "blank": "Mobile Number Cannot Be Blank",
        },
        validators=[validate_mobile]
    )
    
    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators=[validate_password]
    )
    
    class Meta:
        model = Creator
        fields = ("id", "name", "email", "mobile", "password")
    
    def validate_email(self, value):
        if Creator.objects.filter(email=value).exists():
            raise serializers.ValidationError("User With Given Email Address Already Exists")
        
        return value
        
    def register(self, validated_data):
        user = Creator(
            name=validated_data["name"],
            email=validated_data["email"],
            mobile=validated_data["mobile"],
        )
    
        user.password = make_password(validated_data["password"])
        user.save()
        return user


class RegisterAttendeeSerializer(ModelSerializer):
    name = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Name Must Be Provided", 
            "blank": "Name Must Be Provided" 
        },
        validators=[validate_name]
    )
    
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators=[validate_email]
    )
    
    mobile = serializers.CharField(
        required=False,
        allow_blank=True,
        error_messages={ 
            "required": "Mobile Number Must Be Provided", 
            "blank": "Mobile Number Cannot Be Blank",
        },
        validators=[validate_mobile]
    )
    
    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators=[validate_password]
    )
    
    class Meta:
        model = Attendee
        fields = ("id", "name", "email", "mobile", "password")
    
    def validate_email(self, value):
        if Attendee.objects.filter(email=value).exists():
            raise serializers.ValidationError("User With Given Email Address Already Exists")
        
        return value
        
    def register(self, validated_data):
        user = Attendee(
            name=validated_data["name"],
            email=validated_data["email"],
            mobile=validated_data["mobile"],
        )
    
        user.password = make_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators=[validate_email]
    )

    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators=[validate_password]
    )
    
#----------------------------------------------------#
#----------------- QUIZ SERIALIZERS -----------------#
#----------------------------------------------------#
    
class OptionsSerializer(serializers.ModelSerializer):
    A = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Option 'A' Must Be Provided", 
            "blank": "Option 'A' Must Be Provided", 
            "invalid": "Enter A Valid Option 'A'" 
        },
        validators=[validate_option]
    )
    
    B = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Option 'B' Must Be Provided", 
            "blank": "Option 'B' Must Be Provided", 
            "invalid": "Enter A Valid Option 'B'" 
        },
        validators=[validate_option]
    )
    
    C = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Option 'C' Must Be Provided", 
            "blank": "Option 'C' Must Be Provided", 
            "invalid": "Enter A Valid Option 'C'" 
        },
        validators=[validate_option]
    )
    
    class Meta:
        model = Option
        fields = ["A", "B", "C"]

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionsSerializer()
    
    question = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Question Must Be Provided", 
            "blank": "Question Must Be Provided", 
            "invalid": "Enter A Valid Question" 
        },
        validators=[validate_question]
    )
    
    points = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Points Must Be Provided", 
            "blank": "Points Must Be Provided", 
            "invalid": "Enter Valid Points" 
        },
        validators=[validate_points]
    )
    
    correct = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Correct Option Must Be Provided", 
            "blank": "Correct Option Must Be Provided", 
            "invalid": "Enter A Valid Correct Option" 
        },
        validators=[validate_correct]
    )

    class Meta:
        model = Question
        fields = ["question", "points", "options", "correct"]

class CreateQuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    title = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Title Must Be Provided", 
            "blank": "Title Must Be Provided", 
            "invalid": "Enter A Valid Title" 
        },
        validators=[validate_title]
    )

    difficulty = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Difficulty Must Be Provided", 
            "blank": "Difficulty Must Be Provided", 
            "invalid": "Enter A Valid Difficulty" 
        },
        validators=[validate_difficulty]
    )

    creator_id = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Creator ID Must Be Provided", 
            "blank": "Creator ID Cannot Be Blank", 
        }
    )

    class Meta:
        model = Quiz
        fields = ("id", "creator_id", "title", "difficulty",  "points", "questions")

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        creator_id = validated_data.pop("creator_id")

        if not Creator.objects.filter(id=creator_id).exists():
            raise serializers.ValidationError({"creator_id": "Invalid Creator ID"})

        quiz = Quiz.objects.create(creator_id=creator_id, **validated_data)

        total_points = 0
        
        for question_data in questions_data:
            options_data = question_data.pop("options")
            points = question_data["points"]
            total_points += int(points)

            question = Question.objects.create(quiz=quiz, **question_data)
            Option.objects.create(question=question, **options_data)

        quiz.points = total_points
        quiz.save()

        return quiz

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    
    class Meta:
        model = Quiz
        fields = ["id", "title", "difficulty", "points", "questions", "creator_id"]

#----------------------------------------------------#
#----------------- ANSWER SERIALIZERS ---------------#
#----------------------------------------------------#

class AnsweredQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerQuestions
        fields = ["question", "points", "selected", "correct"]

class AnsweredQuizSerializer(serializers.ModelSerializer):
    questions = AnsweredQuestionsSerializer(many=True)

    class Meta:
        model = Answer
        fields = ["quizID", "attendeeID", "participantName", "quizTitle", "totalPoints", "finalPoints", "completionDate", "questions"]

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        quiz_answer = Answer.objects.create(**validated_data)

        for question_data in questions_data:
            AnswerQuestions.objects.create(quizAnswer=quiz_answer, **question_data)

        return quiz_answer
    
class GetAnsweredQuizSerializer(serializers.ModelSerializer):
    questions = AnsweredQuestionsSerializer(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = ["quizID", "attendeeID", "quizTitle", "difficulty", "participantName", "totalPoints", "finalPoints", "completionDate", "questions"]
