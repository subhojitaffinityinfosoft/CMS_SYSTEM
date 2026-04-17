import { ClipLoader } from 'react-spinners'
import { useTheme } from '../theme-provider'

const AppLoader = ({background}) => {
  const {theme} = useTheme();
  return (
          <div className={`fixed top-0 min-h-screen min-w-full z-50 flex items-center flex-col space-y-2 justify-center	 ${background ? background : ''}`}>
          <ClipLoader
          color={'red'}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
      />
      <h4 className="text-center text-primary">
          Loading ....
      </h4>
      </div>
  )
}

export default AppLoader