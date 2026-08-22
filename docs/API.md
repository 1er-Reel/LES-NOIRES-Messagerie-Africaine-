# LES NOIRES - API Documentation

## Endpoints

### Health Check
```
GET /health
```

### Authentication

#### Register
```
POST /api/auth/register
Body: { "phoneNumber": "+2341234567" }
```

#### Verify
```
POST /api/auth/verify
Body: { "phoneNumber": "+2341234567" }
```

### Messaging

#### Send Message
```
POST /api/messages/send
Body: {
  "fromPhone": "+2341234567",
  "toPhone": "+2348765432",
  "message": "Bonjour!"
}
```

#### Get Messages
```
GET /api/messages/:phoneNumber
```

### Mesh Network

#### Start Node
```
POST /api/mesh/start
Body: { "phoneNumber": "+2341234567" }
```

#### Get Stats
```
GET /api/mesh/stats/:phoneNumber
```

#### Get Peers
```
GET /api/mesh/peers/:phoneNumber
```

### Countries

#### List Supported Countries
```
GET /api/countries
```
