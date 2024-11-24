from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from math import ceil

class QuizPagination(PageNumberPagination):
    page_size = 12

    def get_paginated_response(self, data):
        total_pages = ceil(self.page.paginator.count / self.page_size)
        return Response({ "quizzes": data, "pages": total_pages })