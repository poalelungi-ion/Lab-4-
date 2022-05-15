import music from '../../../Nogymx_Mirage_of_the_Mind_🎨_lofi_hip_hop_relaxing_beats.mp3'
export default function  PlayerComponent () {
    return(
        <div className="player">
            <audio controls autoPlay={true} loop={true}>
                <source src={music} />
            </audio>
        </div>
    )
}