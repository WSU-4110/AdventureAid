// Define an abstract class for a local attraction
class LocalAttraction {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    displayInfo() {
        console.log(`${this.name} is located at ${this.location}.`);
    }
}

// Define concrete classes for different types of local attractions
class Museum extends LocalAttraction {
    constructor(name, location, exhibits) {
        super(name, location);
        this.exhibits = exhibits;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`It has ${this.exhibits.length} exhibits.`);
    }
}

class Park extends LocalAttraction {
    constructor(name, location, area) {
        super(name, location);
        this.area = area;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`It covers an area of ${this.area} acres.`);
    }
}

// Define a factory class to create local attraction objects
class LocalAttractionFactory {
    createAttraction(type, name, location, extraInfo) {
        switch (type) {
            case 'Museum':
                return new Museum(name, location, extraInfo);
            case 'Park':
                return new Park(name, location, extraInfo);
            default:
                throw new Error('Unknown attraction type');
        }
    }
}

// Usage:
const factory = new LocalAttractionFactory();
const museum = factory.createAttraction('Museum', 'National Museum', 'Washington, D.C.', [{ title: 'Exhibit A' }, { title: 'Exhibit B' }]);
const park = factory.createAttraction('Park', 'Central Park', 'New York City', 843);

museum.displayInfo();  // Output: National Museum is located at Washington, D.C.. It has 2 exhibits.
park.displayInfo();    // Output: Central Park is located at New York City. It covers an area of 843 acres.
