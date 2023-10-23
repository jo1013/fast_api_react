import smtplib
from email.message import EmailMessage
from emails import Message
from emails.backend.smtp.backend import SMTPBackend
import os

def send_email(subject, to_email, content):
    msg = EmailMessage()
    msg.set_content(content)
    msg["Subject"] = subject
    msg["From"] = "your_email@example.com"
    msg["To"] = to_email

    # 이메일 서버 설정
    server = smtplib.SMTP_SSL("smtp.example.com", 465)
    server.login("your_email@example.com", "your_password")
    server.send_message(msg)
    server.quit()

def send_reset_password_email(email_to: str, email: str, token: str):
    """
    비밀번호 재설정 이메일을 보냅니다.

    :param email_to: 받는 사람의 이메일 주소.
    :param email: 보내는 사람의 이메일 주소.
    :param token: 비밀번호 재설정 토큰.
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.example.com")
    smtp_user = os.getenv("SMTP_USER", "user@example.com")
    smtp_password = os.getenv("SMTP_PASSWORD", "password")
    smtp_port = os.getenv("SMTP_PORT", 587)
    smtp_tls = os.getenv("SMTP_TLS", True)

    subject = "Password Reset Request"
    with open("email_template.html", 'r') as f:
        email_html = f.read()
    body = email_html.replace("{{token}}", token)  # token을 이메일 템플릿에 삽입

    message = Message(
        subject=subject,
        html=body,
        mail_from=(email, "Support")
    )

    backend = SMTPBackend(
        user=smtp_user, 
        password=smtp_password, 
        host=smtp_host, 
        port=smtp_port, 
        tls=smtp_tls
    )

    response = message.send(to=email_to, render={"email": email}, smtp=backend)
    return response
