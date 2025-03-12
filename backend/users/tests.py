from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from djoser.utils import encode_uid
from django.conf import settings

User = get_user_model()

class UserAccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_create_user(self):
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(user.check_password(self.user_data['password']))

    def test_create_superuser(self):
        superuser_data = {
            **self.user_data,
            'is_staff': True,
            'is_superuser': True,
        }
        superuser = User.objects.create_superuser(**superuser_data)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_user_str(self):
        self.assertEqual(str(self.user), self.user_data['email'])

    def test_get_full_name(self):
        full_name = f"{self.user_data['first_name']} {self.user_data['last_name']}"
        self.assertEqual(self.user.get_full_name(), full_name)

    def test_get_short_name(self):
        self.assertEqual(self.user.get_short_name(), self.user_data['first_name'])

class UserViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }
        self.user = User.objects.create_user(**self.user_data)
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_custom_user_view(self):
        response = self.client.get(reverse('users:me'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], self.user_data['email'])

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_token_obtain_pair_view(self):
        response = self.client.post(reverse('users:jwt-create'), self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_refresh_view(self):
        refresh = RefreshToken.for_user(self.user)
        response = self.client.post(
            reverse('users:jwt-refresh'), {'refresh': str(refresh)}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)

    def test_token_verify_view(self):
        refresh = RefreshToken.for_user(self.user)
        response = self.client.post(
            reverse('users:jwt-verify'), {'token': str(refresh.access_token)}
        )
        self.assertEqual(response.status_code, 200)

    def test_logout_view(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        response = self.client.post(reverse('users:logout'))
        self.assertEqual(response.status_code, 204)

class SocialAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
        }

    def test_provider_auth_view_google(self):
        # Mock the Google OAuth2 response
        response = self.client.post(
            reverse('users:provider-auth', kwargs={'provider': 'google'}),
            {
                'access_token': 'mock_google_access_token',
                'code': 'mock_google_code',
            },
        )
        # Add assertions based on your expected response
        # For example, check if the response status code is 201
        self.assertEqual(response.status_code, 201)

    def test_provider_auth_view_facebook(self):
        # Mock the Facebook OAuth2 response
        response = self.client.post(
            reverse('users:provider-auth', kwargs={'provider': 'facebook'}),
            {
                'access_token': 'mock_facebook_access_token',
                'code': 'mock_facebook_code',
            },
        )
        # Add assertions based on your expected response
        # For example, check if the response status code is 201
        self.assertEqual(response.status_code, 201)

class EmailVerificationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_activation_email(self):
        # Ensure activation email is sent
        self.assertEqual(len(self.client.outbox), 1)
        activation_email = self.client.outbox[0]
        self.assertEqual(activation_email.subject, 'Account activation')
        self.assertIn(self.user_data['email'], activation_email.body)

    def test_activation_view(self):
        uid = encode_uid(self.user.pk)
        token = 'mock_activation_token'
        response = self.client.get(
            reverse('users:activation', kwargs={'uid': uid, 'token': token})
        )
        # Add assertions based on your expected response
        # For example, redirect to a success page
        self.assertEqual(response.status_code, 302)

    def test_confirmation_email(self):
        # Ensure confirmation email is sent after activation
        self.user.is_active = True
        self.user.save()
        self.assertEqual(len(self.client.outbox), 2)  # 1 activation + 1 confirmation
        confirmation_email = self.client.outbox[1]
        self.assertEqual(confirmation_email.subject, 'Account confirmation')
        self.assertIn(self.user_data['email'], confirmation_email.body)

class PasswordResetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_password_reset_email(self):
        response = self.client.post(
            reverse('users:password_reset'), {'email': self.user_data['email']}
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(self.client.outbox), 1)
        reset_email = self.client.outbox[0]
        self.assertEqual(reset_email.subject, 'Password reset')
        self.assertIn(self.user_data['email'], reset_email.body)

    def test_password_reset_confirm_view(self):
        uid = encode_uid(self.user.pk)
        token = 'mock_reset_token'
        new_password = 'new_test_password'
        response = self.client.post(
            reverse(
                'users:password_reset_confirm', kwargs={'uid': uid, 'token': token}
            ),
            {'new_password': new_password, 're_new_password': new_password},
        )
        # Add assertions based on your expected response
        # For example, check if the response status code is 204
        self.assertEqual(response.status_code, 204)

    def test_password_changed_confirmation_email(self):
        # Ensure password changed confirmation email is sent
        self.user.set_password('new_test_password')
        self.user.save()
        self.assertEqual(len(self.client.outbox), 1)  # 1 password changed email
        confirmation_email = self.client.outbox[0]
        self.assertEqual(confirmation_email.subject, 'Password changed confirmation')
        self.assertIn(self.user_data['email'], confirmation_email.body)