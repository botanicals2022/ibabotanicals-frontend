import { Grid } from "@mui/material";
import CustomTable from '../Globals/CustomTable';

// import sample data 
import SampleDataProduction from './sampleDataProduction';

const ProductionHarvest = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <CustomTable 
            key={`key-${1}`}
            headerCols={SampleDataProduction.headerCols1} 
            dataRows={SampleDataProduction.dataRows1}
            showTotal={true}
        />
      </Grid>
      {/* <Grid item xs></Grid> */}
    </Grid>
  )
}

export default ProductionHarvest;