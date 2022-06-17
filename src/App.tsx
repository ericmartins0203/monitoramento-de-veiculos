import { Button, CssBaseline, Grid, MenuItem, Select, ThemeProvider } from '@mui/material'
import NavBar from './components/NavBar';
import theme from './theme';
import {styled} from '@mui/material/styles'
import {Loader} from 'google-maps'
import { useEffect, useRef } from 'react';
import { getCurrentPosition } from './utils/geolocation';

const GOOGLE_MAPS_API_KEY=''

const loader = new Loader(GOOGLE_MAPS_API_KEY)

const Form = styled('form')(({theme: _theme}) => ({margin: theme.spacing(1)}))
const MapContainer = styled('div')(({theme: _theme}) => ({
  width: '100%', 
  height: '100%'
}))


function App() {
  const mapRef = useRef<google.maps.Map>()

  useEffect(() => {
    (async () => {
      await loader.load();
      const position = await getCurrentPosition({enableHighAccuracy: true});
      const divMap = document.getElementById('map') as HTMLDivElement
      mapRef.current = new google.maps.Map(divMap, {zoom:15, center: position})
  })()
}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar/>
      <Grid container style= {{width: '100%', height: '100%'}}>
        <Grid item xs={12} sm={3}>
          <Form>
            <Select fullWidth displayEmpty defaultValue={""}>
              <MenuItem value="">
                <em>Selecione uma rota</em>
              </MenuItem>
              <MenuItem value=""> Rota 1 </MenuItem>
            </Select>
            <div style={{textAlign: 'center', margin: theme.spacing(1)}}>
              <Button type="submit" variant="contained">
                Iniciar rota 
              </Button>
            </div>
          </Form>
        </Grid>
        <Grid item xs={12} sm={9}>
          <MapContainer id='map'>

          </MapContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
