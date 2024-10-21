import random
import string

def getUniqueID(prefix = "QID", length = 12):
    unique = "".join(random.choices(string.ascii_uppercase + string.digits, k=(length - len(prefix))))
    return f"{prefix}{unique}".upper()