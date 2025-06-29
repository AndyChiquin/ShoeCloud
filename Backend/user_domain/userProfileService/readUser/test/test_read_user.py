import unittest
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

class ReadUserServiceTestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_health_check(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("status", response.get_json())
        self.assertEqual(response.get_json()["status"], "Read User Service OK")

    def test_get_user_by_id(self):
        response = self.client.get("/user/1")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], 1)
        self.assertIn("username", data)

if __name__ == "__main__":
    unittest.main()
