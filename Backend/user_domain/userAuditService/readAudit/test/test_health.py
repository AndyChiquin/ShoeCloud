import unittest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

class SimpleHealthCheckTest(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_health_check(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "Audit Service OK")

if __name__ == "__main__":
    unittest.main()
