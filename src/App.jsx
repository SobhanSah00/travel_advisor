import react from "react";
import { CssBaseline, Grid} from "@mui/material";


import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetail'

const App = () => {
  return (
    <>
      <CssBaseline/>

      <Header />

      <Grid container spacing={3} style={{with : '100%'}}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>

      <List/>

      <Map />
      
      <PlaceDetails />
    </>
  )
}

export default App