# HistDoc Platform

HistDoc is a web-based platform designed to support the digitization, management, and transcription of historical Arabic and Hebrew manuscripts. It integrates user-friendly interfaces with AI-powered tools to assist researchers, developers, and administrators in preserving cultural heritage.

##  Features

- **Role-based access** for Researchers, Developers, and Admins
- Researchers can:
  - Upload and manage manuscript images
  - Organize and annotate ground truth XML files
  - Run AI models on manuscript images
  - Provide feedback and ratings on models
- Developers can:
  - Upload, test, and manage custom AI models (.py scripts)
  - Define model parameters and annotations
  - View feedback and ratings from researchers
- Admins can:
  - Review and approve developer account requests

##  Tech Stack

- **Frontend:** React
- **Backend:** Django REST Framework
- **Database:** MongoDB
- **Version Control:** GitHub
- **IDE:** PyCharm
- **Deployment:** Compatible with Windows 11 environments

##  System Architecture

The platform follows a layered architecture:

- **Infrastructure Layer:** Security, OS, and database server (MongoDB)
- **Development Layer:** Code management with GitHub, development in PyCharm
- **Application Services Layer:** User authentication, document management,  model for  
- **User Interface Layer:** React frontend for interactive, role-specific workflows


##  Getting Started

1. Clone the repository: 
 git clone https://github.com/einasns/HistDoc.git

2. Install backend dependencies:
 pip install -r requirements.txt
3. Install frontend dependencies:
 npm install
4. Run backend:
python manage.py runserver
5. Run frontend:
   npm run build


---

*For any questions or contributions, feel free to open an issue or submit a pull request.*

##  Authors

- **Einas Nsasra**
- **Haneen Abu Salook**
