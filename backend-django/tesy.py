from dotenv.main import load_dotenv
import os

load_dotenv()
print(os.getenv('PASS'))