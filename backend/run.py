from app import run
from app import User,Food,Review,Relationship,Message,util



User.dbpath = "data/uva.db"
PATH = os.path.dirname(__file__)
DATAPATH = os.path.join(PATH, 'data', 'uva.db')
Food.dbpath = DATAPATH
Review.dbpath = DATAPATH
Relationship.dbpath=DATAPATH
Message.dbpath=DATAPATH


run()