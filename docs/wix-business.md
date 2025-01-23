# WixBusiness Module

### Overview
The `WixBusiness` and `WixBusinessLocation` modules are part of a Node.js library that simplifies integration with the Wix Business API. These modules allow developers to manage business locations programmatically, including creating, updating, and retrieving location details.

### Dependencies
- `wix-twix`: The main library that provides the `WixBusiness` and `WixBusinessLocation` modules.
- `@wix/business-tools`: A library that provides tools for managing Wix business locations.

### Installation
```bash
npm install wix-twix @wix/business-tools
```

---

## `WixBusiness`

### Features
- Manage business locations with ease.
- Event listeners for location-related changes.
- Create and retrieve locations programmatically.

### Example Usage
```typescript
import { WixBusiness } from 'wix-twix/server';

const wixBusiness = new WixBusiness();

// Fetch all locations
const locations = await wixBusiness.getLocations();

// Get a location by ID
const location = await wixBusiness.getLocationById('location-id');

// Create a new location
const newLocation = await wixBusiness.createLocation({
  name: 'New Location',
  description: 'This is a new location.',
  email: 'contact@location.com',
  phone: '123-456-7890',
  timeZone: 'America/New_York',
});

console.log(newLocation); 
```

---
## `WixBusinessLocation`

### Features
- Represents a single business location.
- Provides methods to manage and retrieve location details.

### Example Usage
```typescript
import { WixBusiness } from 'wix-business-tools';

// Create an instance of WixBusiness
const wixBusiness = new WixBusiness();

// Get a location by ID
const location = await wixBusiness.getLocationById('location-id');

// Update location details
await location.update({
  name: 'Updated Location Name',
  phone: '987-654-3210',
});

// Set location as default
await location.setAsDefault();

// Archive location
await location.archive();
```
