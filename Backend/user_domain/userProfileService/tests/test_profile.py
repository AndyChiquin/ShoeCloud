import unittest
from main import app

class UserProfileServiceTestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_health_check(self):
        """Test de verificación del estado del microservicio"""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("status", response.get_json())
        self.assertEqual(response.get_json()["status"], "User Profile Service OK")

if __name__ == "__main__":
    unittest.main()
