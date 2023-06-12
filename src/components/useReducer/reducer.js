export let reducerState ={
    originLat:"",
    originLng:"",
    destinationLat:"",
    destinationLng:""
}

export const Reducer =(state, action)=>{
    switch (action.type) {
        case 'originLat':
            return {...state, originLat:action.post }
        case 'originLng':
            return {...state, originLng:action.post }
        case 'destinationLat' :
            return {...state, destinationLat:action.post }
        case 'destinationLng' :
            return {...state, destinationLng:action.post }
    
        default:
            return state
    }
}