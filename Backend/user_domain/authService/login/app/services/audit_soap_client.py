from zeep import Client

def log_user_action_soap(user_id: int, action: str, metadata: dict = None):
    try:
        client = Client("http://3.209.221.173:8014/?wsdl")
        metadata_str = str(metadata) if metadata else ""
        response = client.service.create_audit(user_id, action, metadata_str)
        print("✅ SOAP Audit log created, ID:", response)
    except Exception as e:
        print("❌ SOAP Audit error:", str(e))
