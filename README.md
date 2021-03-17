# TakBlue
## Team FECK

**Mentor**: Joan

**Mentees**:
- Franco Velasco
- Emman Evangelista
- Chino Tesoro
- Kyla Martin

## Setup
1. Create a new folder for the project
2. Open Git Bash or Command Prompt
3. Clone the remote repository
    - Run `git clone https://github.com/dnamme/takblue.git`
4. Initialize environment
    - Mac/Linux: `python3 -m virtualenv env`
    - Windows: `virtualenv env`
    **NOTE:** It is important that the name of the environment is `env` since that directory is already added in the .gitignore file. Changing the name will lead to complications, unless if you manually edit .gitignore.
5. Activate environment
    - Mac/Linux: `./env/bin/activate`
    - Windows: `./env/Scripts/activate`
    - To deactivate: `deactivate`
6. Install Django
    - Run `pip install django`

## How to Run
1. Open the folder for the project (top-most)
2. Activate the environment
    - Mac/Linux: `./env/bin/activate`
    - Windows: `./env/Scripts/activate`
3. Go to project folder
    - Run `cd takblue`
4. Run `python manage.py runserver`