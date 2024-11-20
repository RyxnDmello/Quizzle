import random
import string

def getUniqueID(prefix, length = 12):
    unique = "".join(random.choices(string.ascii_uppercase + string.digits, k=(length - len(prefix))))
    return f"{prefix}{unique}".upper()

def getUniqueCreatorID(length = 12):
    return getUniqueID("CID", length)

def getUniqueAttendeeID(length = 12):
    return getUniqueID("AID", length)

def getUniqueQuizID(length = 12):
    return getUniqueID("QID", length)

def getError(errors):
    if isinstance(errors, list) and errors:
        return str(errors[0])
    
    elif isinstance(errors, dict):
        first_error_list = next(iter(errors.values()), [])
        return str(first_error_list[0]) if first_error_list else "Failed Due To Server Error"
    
    return "Failed Due To Server Error"