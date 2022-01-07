import react, {useState, useEffect } from "react";
import  getMergeSortAnimations  from "../SortingAlgos/mergeSort";
import './SortingVisualizer.css'

const NUMBER_OF_ARRAY_BARS = 100
const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {
    const [array, setArray] = useState([])

    useEffect(() => {
       resetArray()
    }, [])

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomValuesBetween(5, 510));
        }
        setArray(array);
    }
    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            console.log(animations[i])
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }


    return(
        <div className="array-container">
            {array.map((value, idx) => (
                <div className="array-bar" key = {idx} style={{height: `${value}px`}}>
                    
                </div>
            ))}
        <button onClick={() => resetArray()}>Generate New Array</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
        </div>
    )
}

function randomValuesBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default SortingVisualizer