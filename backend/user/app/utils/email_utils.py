import smtplib
from email.message import EmailMessage

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
