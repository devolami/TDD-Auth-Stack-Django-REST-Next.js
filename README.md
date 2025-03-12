# Next.js Authentication App with TDD (Jest) and Django Backend

This project is a complete authentication application built with Next.js (React), Redux Toolkit, Jest for testing, and Django as the backend API. It follows a Test-Driven Development (TDD) approach, ensuring robust and reliable authentication functionality.

## Features

* **User Registration:** Allows users to create new accounts.
* **User Login:** Enables users to log in with their credentials.
* **Account Activation:** Sends activation emails and verifies accounts.
* **Social Authentication:** Supports social login (e.g., Google, Facebook).
* **JWT Authentication:** Uses JSON Web Tokens (JWT) for secure authentication.
* **Protected Routes:** Implements route protection for authenticated users.
* **Redux Toolkit State Management:** Manages authentication state using Redux Toolkit.
* **Comprehensive Testing:** Includes unit and integration tests written with Jest.
* **Django REST Framework Backend:** Provides a robust and scalable API using Django.
* **React Hook Form:** Handles form state and validation.
* **React Toastify:** Provides user feedback via toast notifications.
* **Tailwind CSS:** Styled with Tailwind CSS.


## Technologies Used

* **Frontend:**
    * Next.js (React)
    * TypeScript
    * Redux Toolkit
    * React Hook Form
    * React Toastify
    * Jest
    * @testing-library/react
    * @testing-library/jest-dom
    * @testing-library/react-hooks
* **Backend:**
    * Django
    * Django REST Framework
    * Simple JWT

## Getting Started

### Prerequisites

* Node.js (>= 18)
* npm or yarn
* Python (>= 3.8)
* pip
* Virtualenv (recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Backend Setup (Django):**

    * Create a virtual environment:

        ```bash
        python -m venv venv
        source venv/bin/activate  # On macOS/Linux
        venv\Scripts\activate  # On Windows
        ```

    * Install dependencies:

        ```bash
        cd backend
        pip install -r requirements.txt
        ```

    * Run migrations:

        ```bash
        python manage.py migrate
        ```

    * Create a superuser:

        ```bash
        python manage.py createsuperuser
        ```

    * Start the development server:

        ```bash
        python manage.py runserver
        ```

3.  **Frontend Setup (Next.js):**

    * Install dependencies:

        ```bash
        cd ../frontend
        npm install  # or yarn install
        ```

    * Set up environment variables:
        * Create a `.env.local` file in the frontend directory.
        * Add the following variables:

            ```
            NEXT_PUBLIC_API_URL=http://localhost:8000/api
            ```

    * Start the development server:

        ```bash
        npm run dev # or yarn dev
        ```

### Running Tests

1.  **Backend Tests:**

    ```bash
    cd backend
    python manage.py test
    ```

2.  **Frontend Tests:**

    ```bash
    cd ../frontend
    npm run test # or yarn test
    ```

### TDD Approach

This project emphasizes a TDD approach. Tests were written before the implementation, ensuring that the code meets the required specifications.

* **Unit Tests:** Focus on testing individual components and functions.
* **Integration Tests:** Verify the interaction between different parts of the application.
* **Redux Tests:** Ensure the correct behavior of Redux actions, reducers, and selectors.
* **API Tests:** Test the backend API endpoints.

### Deployment

* **Frontend:** Deploy the Next.js application to a hosting platform like Vercel or Netlify.
* **Backend:** Deploy the Django application to a server using a WSGI server like Gunicorn and a web server like Nginx.

### Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Write tests for your changes.
4.  Implement your changes.
5.  Ensure all tests pass.
6.  Submit a pull request.

### License

This project is licensed under the MIT License.