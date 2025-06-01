from Application.database import db
from datetime import datetime
import uuid

class Food(db.Model): # Food model
    __tablename__ = 'foods' # Table name in the database

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4())) # Unique identifier for each food item
    name = db.Column(db.String(100), nullable=False) # Name of the food item
    description = db.Column(db.Text) # Description of the food item
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp when the food item was created

    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)   # Foreign key to link to the user who created the food item

    def __repr__(self):  # String representation of the Food object
        return f"<Food {self.name}>"        # Method to represent the Food object as a string
