import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { GoogleMap, Marker } from '@react-google-maps/api';
import AppLoader from './ux/AppLoader';
import { CodeSquare, MapPin, User, X } from 'lucide-react';
import { Button } from './ui/button';
const containerStyle = {
    width: '100%',
    height: '80vh',
  }
const MapView = ({open,setOpen,latLng,isLoaded,photoName,dtls}) => {
  console.log(isLoaded)
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    if(dtls){
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds({lat:Number(dtls?.lat),lng:Number(dtls?.lng)})
        map.fitBounds(bounds)
        setMap(map)
    }
  }, [dtls])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
  
  return (
        <Drawer open={open} onOpenChange={setOpen}  >
            <DrawerContent className="p-0">
                <DrawerHeader className={'flex items-center justify-between flex-row'}>
                <DrawerTitle className="text-md text-muted-foreground font-PoppinsRegular ">Notify Location View</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                <Button size="icon" variant="outline" onClick={() => setOpen(false)}>
                        <X/>
                </Button>
                </DrawerHeader>
                <DrawerFooter>
                  {(isLoaded && dtls)? <div className='border-2 rounded-t-lg border-primary grid grid-cols-12 gap-0'>
                        <div className='col-span-12 md:col-span-3 bg-muted/10 rounded-tl-lg'>
                          <div className='h-48 w-full bg-muted'>
                               <img
                                src={dtls?.photoName}
                                className='object-contain  border h-full w-full'
                               />
                          </div>
                          <div className='grid grid-cols-12 gap-5 my-3 p-5'>
                              <div className='col-span-12 md:col-span-6'>
                                <div className='text-xs font-PoppinsRegular uppercase flex items-center gap-1 justify-start'><User size={15}/>Name</div>
                                <span className='text-xs font-PoppinsMedium'>{dtls?.name || '--'}</span>
                              </div>
                              <div className='col-span-12 md:col-span-6'>
                                   <div className='text-xs font-PoppinsRegular uppercase flex items-center gap-1 justify-start'><CodeSquare size={15}/>Employee Code</div>
                                  <span className='text-xs font-PoppinsMedium'>{dtls?.employeeCode || '--'}</span>
                              </div>
                              <div className='col-span-12 md:col-span-12'>
                                  <div className='text-xs font-PoppinsRegular uppercase flex items-center gap-1 justify-start'><MapPin size={15}/>&nbsp;Notify Location</div>
                                  <span className='text-xs font-PoppinsMedium'>{dtls?.notifyAddress || '--'}</span>
                              </div>
                              <div className='col-span-12 md:col-span-12'>
                                  <div className='text-xs font-PoppinsRegular uppercase flex items-center gap-1 justify-start'><MapPin size={15}/>&nbsp;Notify Lat,Long</div>
                                  <span className='text-xs font-PoppinsMedium'>{dtls?.lat},{dtls?.lng}</span>
                              </div>
                          </div>  
                          
                         
                        </div>
                        <div className='col-span-12 md:col-span-9 border-l-2 border-primary rounded-tr-lg'>
                          <GoogleMap
                        mapContainerStyle={containerStyle}
                        // center={center}
                        
                        options={{
                            mapTypeControl:false,
                            clickableIcons:true,
                            zoom: 16,
                            // gestureHandling:'none',
                              draggable: false,
                            fullscreenControl:false,
                            disableDoubleClickZoom:false,
                            disableDefaultUI:true,
                            streetViewControl:false,
                            cameraControl:false,
                            minZoom:16,
                            maxZoom:16,
                        }}
                        // center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        >
                        <Marker
                            position={{
                              lat:Number(dtls?.lat),
                              lng:Number(dtls?.lng)
                            }}
                            draggable={false} 
                            // title='Clock In'
                        />
                      
                          </GoogleMap>
                        </div>
                  </div> : <AppLoader/>}
                <DrawerClose>
                    {/* <Button variant="outline">Cancel</Button> */}
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
  )
}

export default MapView