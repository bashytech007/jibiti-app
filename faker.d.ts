declare module '@faker-js/faker' {
    export const faker: Faker;
  
    interface Faker {
      person: {
        fullName(): string;
        firstName(): string;
        lastName(): string;
      };
      internet: {
        email(): string;
        userName(): string;
      };
      lorem: {
        paragraph(): string;
        sentence(): string;
      };
      // Add more type definitions as needed
    }
  }
 