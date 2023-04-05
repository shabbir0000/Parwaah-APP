import  React ,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Component/Login"
import Forget from "./Component/Forget"
import Signup from "./Component/Signup"
import Digitalrecords from './Component/Digitalrecords';
import Home from './Component/Home';
import Comingsoon from "./Component/Comingsoon";
import Profile from "./Component/Profile";
import Showpdfimg from './Component/Showpdfimg';

const Stack = createNativeStackNavigator();
const screenoption = {
    headerShown: false,
}

function Navigation() {
    
    return (
      <NavigationContainer >
          <Stack.Navigator initialRouteName= 'home' screenOptions={screenoption}>
          <Stack.Screen name="Digitalrecords" component={Digitalrecords} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="forget" component={Forget}  />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="loading" component={Comingsoon} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="show" component={Showpdfimg} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  export default Navigation;