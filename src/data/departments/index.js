import cseData from './cse.json';
import chemicalData from './chemical.json';
import civilData from './civil.json';
import electricalData from './electrical.json';
import electronicsData from './electronics.json';
import mechanicalData from './mechanical.json';
import petroleumData from './petroleum.json';

// Import other department data as they are created
// import civilData from './civil.json';
// import electricalData from './electrical.json';
// import electronicsData from './electronics.json';
// import mechanicalData from './mechanical.json';
// import petroleumData from './petroleum.json';

const departmentsData = {
  cse: cseData,
  chemical: chemicalData,
  civil: civilData,
  electrical: electricalData,
  electronics: electronicsData,
  mechanical: mechanicalData,
  petroleum: petroleumData
};

export default departmentsData; 