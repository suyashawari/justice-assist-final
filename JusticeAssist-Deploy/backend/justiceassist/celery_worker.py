# """
# Celery worker entry point.
# This file creates the Flask app and exposes the Celery instance
# for the Celery worker to use.

# Usage:
#     celery -A celery_worker worker --loglevel=info
# """
# from app.models import create_app

# # Create the Flask application
# flask_app = create_app()

# # Extract the Celery app from Flask extensions
# celery_app = flask_app.extensions["celery"]

from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

# Create Celery instance
celery = Celery(
    'tasks',
    broker=os.getenv('CELERY_BROKER_URL', 'redis://redis:6379/0'),
    backend=os.getenv('CELERY_RESULT_BACKEND', 'redis://redis:6379/0')
)

# Configure Celery
celery.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

# Import tasks
from app.tasks import *  # This imports your task functions