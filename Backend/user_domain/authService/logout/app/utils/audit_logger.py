from zeep import Client

def log_user_action_soap(user_id, action, metadata):
    try:
        client = Client("http://3.209.221.173:8014/?wsdl")
        metadata_str = str(metadata)
        result = client.service.create_audit(user_id, action, metadata_str)
        print("✅ SOAP Audit log created:", result)
    except Exception as e:
        print("❌ SOAP error:", str(e))
