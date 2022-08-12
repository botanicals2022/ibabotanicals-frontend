const headerCols1 = [
  'product name',
  'site',
  'start time',
  'end time',
]
const dataRows1 = [
  {
    product_name: '1',
    site: 'Mango A',
    start_time:  '',
    end_time: '',
  },
  {
    product_name: '2',
    site: 'Mango C',
    start_time:  '3:06',
    end_time: '3:21',
  },
  {
    product_name: '3',
    site: 'Foot Ball',
    start_time:  '',
    end_time: '',
  },
  {
    product_name: '4',
    site: 'Demo',
    start_time:  '',
    end_time: '',
  },
  {
    product_name: '5',
    site: 'Commercial',
    start_time:  '3:06',
    end_time: '6:00',
  },
  {
    product_name: '6',
    site: 'Mose',
    start_time:  '',
    end_time: '',
  },
]

const headerCols2 = [
  'received date',
  'receive time'
]
const dataRows2 = [
  {
    received_date: 'nov 15, 2021',
    received_time: '3:30 am'
  },
  {
    received_date: 'nov 17, 2021',
    received_time: '4:16 am'
  }
]

const headerCols3 = [
  'harvest date',
  'start picking time',
  'end picking time',
  'grade'
]
const dataRows3 = [
  {
      harvest_date: '20-02-2022',
      start_picking_time: '7:00 am',
      end_picking_time: '10:00 am',
      grade: 'a'
  },
  {
      harvest_date: '20-02-2022',
      start_picking_time: '8:00 am',
      end_picking_time: '11:00 am',
      grade: 'b'
  },
  {
      harvest_date: '20-02-2022',
      start_picking_time: '9:00 am',
      end_picking_time: '2:00 pm',
      grade: 'c'
  },
]

const headerCols4 = [
  'fresh weight',
  'no of bags',
  'weight',
  'remarks'
]
const dataRows4 = [
  {
      fresh_weight: '11234',
      no_of_bags: '12',
      weight: '11112',
      remarks: 'remarks'
  },
  {
      fresh_weight: '6000',
      no_of_bags: '34',
      weight: '10454',
      remarks: 'remarks 2'
  },
  {
      fresh_weight: '3300',
      no_of_bags: '5',
      weight: '9232',
      remarks: 'remarks 3'
  },
  {
      fresh_weight: '8000',
      no_of_bags: '800',
      weight: '11112',
      remarks: 'remarks 4'
  },
]

export default {
  headerCols1,
  dataRows1,

  headerCols2,
  dataRows2,

  headerCols3,
  dataRows3,

  headerCols4,
  dataRows4
}