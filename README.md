Yoga Class App Documentation
Overview
The Yoga Class App is a comprehensive platform designed to facilitate user registration, login, enrollment in yoga classes, and seamless management of enrollment periods and batch selections. The app aims to streamline the user experience, ensuring smooth registration, enrollment, and renewal processes for yoga classes.

Features Implemented

*User Registration
Users can register for the app, providing necessary details.
Validation prevents duplicate user enrollments.

*Login Page
Upon successful registration, users are directed to the login page.
Users input their credentials for authentication.

*Plan Selection
After login, users are navigated to the plan page.
Users can select a batch for enrollment in yoga classes for the month.

*Enrollment Process
Users pay the enrollment fee and confirm their enrollment by clicking the "Enroll" button.
Validation prevents re-enrollment within the same month after successful enrollment.

*Subscription Management
Upon plan expiration, users are prompted to reselect a batch, pay the fee, and re-enroll for the upcoming month.

Technical Implementation
Frontend
Registration: Input fields for user details with duplicate validation.
Login Page: Credentials input for authentication.
Plan Page: Batch selection options, enrollment fee, and "Enroll" button.
Subscription Renewal: Automatic redirection and prompts for re-enrollment after plan expiration.

Backend
User Authentication: Validation and storage of user credentials.
Enrollment Management: Tracking and validation of user enrollment for the month.
Subscription Renewal: Automated processes for re-enrollment after plan expiration.

Future Enhancements
Personalized Recommendations
Implement AI-driven recommendations based on user preferences or previous class selections.
Progress Tracking
Integrate features to track user progress or provide performance insights.
Social Integration
Enable sharing of achievements or class schedules on social media platforms.
Conclusion
The Yoga Class App successfully implements a user-friendly interface for registration, login, enrollment, and subscription management in yoga classes. The validation features prevent duplicate enrollments and ensure a seamless user experience. Future enhancements aim to further personalize the user journey and provide additional functionalities for a more comprehensive yoga experience.

********************************************************************************************************************

DataBase Schema Design

Table "enrollments" {
  "EnrollmentID" int(11) [pk, not null]
  "UserID" int(11) [default: NULL]
  "EnrollmentDate" date [default: `curdate()`]
  "SelectedBatch" varchar(20) [not null]
  "EnrollmentExpiration" date [default: `last_day(curdate())`]
}

Table "payments" {
  "PaymentID" int(11) [not null]
  "UserID" int(11) [default: NULL]
  "PaymentDate" date [not null]
  "AmountPaid" decimal(10,2) [not null]
}

Table "users" {
  "UserId" int(11) [pk, not null]
  "Name" varchar(255) [not null]
  "AGE" int(11) [not null]
  "PASSWORD" varchar(15) [not null]
  "email" varchar(30) [not null]
}

Ref:"users"."UserId" < "payments"."UserID"
Ref:"users"."UserId" < "enrollments"."UserID"




API Documentation-> https://documenter.getpostman.com/view/29596760/2s9Ykocgfd