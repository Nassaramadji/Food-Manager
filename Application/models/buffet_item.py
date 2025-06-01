# BuffetItem model for the buffet items in the application.
from Application.database import db
from datetime import datetime

class BuffetItem(db.Model):
    __tablename__ = 'buffet_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)

    content_type = db.Column(db.String(50), nullable=False)  # "food" ou "plat"
    content_id = db.Column(db.String(36), nullable=False)     # ID de Food ou de Plat

    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='buffet_items')

    def get_content(self):
        from Application.models import Food, Plat
        if self.content_type == 'food':
            return Food.query.get(self.content_id)
        elif self.content_type == 'plat':
            return Plat.query.get(self.content_id)
        return None
