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