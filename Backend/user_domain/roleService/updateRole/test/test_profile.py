import unittest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

class UserProfileServiceTestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_health_check(self):
        """Test """
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("status", response.get_json())
        self.assertEqual(response.get_json()["status"], "Role Service OK")

if __name__ == "__main__":
    unittest.main()