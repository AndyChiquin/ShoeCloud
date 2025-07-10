from spyne import Application, rpc, ServiceBase, Unicode, Integer
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from datetime import datetime
from app.db.mongo import db  
import logging

class AuditService(ServiceBase):

    @rpc(Integer, Unicode, Unicode, _returns=Unicode)
    def create_audit(ctx, user_id, action, metadata_str):
        metadata = {"info": metadata_str} if metadata_str else {}
        audit_doc = {
            "user_id": user_id,
            "action": action,
            "timestamp": datetime.utcnow(),
            "metadata": metadata
        }
        result = db["user_audit"].insert_one(audit_doc)
        return str(result.inserted_id)

application = Application(
    [AuditService],
    tns='audit.soap.service',
    in_protocol=Soap11(),
    out_protocol=Soap11()
)

wsgi_app = WsgiApplication(application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    logging.basicConfig(level=logging.INFO)
    server = make_server('0.0.0.0', 8004, wsgi_app)
    print("SOAP server running on http://0.0.0.0:8004")
    server.serve_forever()
