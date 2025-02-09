import React from "react"
import { ScrollView } from "react-native"
import { PetPhoto } from "../../app/utils/ResponsesInterface"
import { PhotoCard } from "../PhotoCard"

export const PhotoSlider = (props: {photos: PetPhoto[] | undefined}) => {
    return(
        <ScrollView horizontal style={{display:"flex", flexDirection:"row", marginRight:10, marginLeft:10}}>
                {props.photos?.map((photo) => (
                    <PhotoCard key={photo.id} image={photo.photo}/>
                  )) }
        </ScrollView>
    )
}