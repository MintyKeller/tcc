
//import audio from "./audio/abc.wav";
import { AudioPlayer } from "./AudioPlayer";

export function Main() {
    return (
        <main className="mx-56 my-4 bg-black ">
            <h1 className="font-bold text-3xl text-white">Audio</h1>
            <hr className="my-4" />
        
              <AudioPlayer />
       
        </main>
    );
}