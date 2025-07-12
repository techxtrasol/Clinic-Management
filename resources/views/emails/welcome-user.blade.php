<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to {{ config('app.name') }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #ffffff;
            padding: 30px;
            border: 1px solid #e9ecef;
        }
        .credentials {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
            color: #6c757d;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to {{ config('app.name') }}</h1>
    </div>

    <div class="content">
        <h2>Hello {{ $user->name }},</h2>

        <p>Welcome to {{ config('app.name') }}! Your account has been created successfully.</p>

        <p>You have been assigned the role of <strong>{{ ucfirst($user->role) }}</strong>.</p>

        <div class="credentials">
            <h3>Your Login Credentials:</h3>
            <p><strong>Email:</strong> {{ $user->email }}</p>
            <p><strong>Temporary Password:</strong> {{ $password }}</p>
        </div>

        <div class="warning">
            <strong>Important:</strong> For security reasons, please change your password immediately after your first login.
        </div>

        <p>To get started, please click the button below to set up your account:</p>

        <a href="{{ $resetUrl }}" class="button">Set Up Your Account</a>

        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #007bff;">{{ $resetUrl }}</p>

        <p>This link will expire in 24 hours for security reasons.</p>

        <p>If you have any questions or need assistance, please contact our support team.</p>

        <p>Best regards,<br>The {{ config('app.name') }} Team</p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
