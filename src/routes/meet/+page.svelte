<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { Button } from "$lib/components/shadcn/ui/button";
    import { Input } from "$lib/components/shadcn/ui/input/index";
    import { Label } from "$lib/components/shadcn/ui/label/index";
    import { collection, doc, setDoc, addDoc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
    import { db } from "$lib/firebase";
    

    let meetingId;
    let localStream;
    let remoteStream;
    let pc;
    let webcamSrc;
    let remoteSrc;

    onMount(()=>{
        const servers = {
            iceServers: [
                {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
                },
            ],
            iceCandidatePoolSize: 10,
        };

        pc = new RTCPeerConnection(servers);
    })

    const startWebcam = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        remoteStream = new MediaStream();

        localStream.getTracks().forEach(track => {
            pc.addTrack(track, localStream);
        })

        pc.ontrack = event => {
            event.streams[0].getTracks().forEach(track => {
                remoteStream.addTrack(track);
            });
        }
 
        console.log(localStream, remoteStream)
        webcamSrc.srcObject = localStream;
        remoteSrc.srcObject = remoteStream;
    }
    
    const startCall = async () => {
        const callsCollection = collection(db, 'calls');
        const callDoc = doc(callsCollection);
        const offerCandidatesCollection = collection(callDoc, 'offerCandidates');
        const answerCandidatesCollection = collection(callDoc, 'answerCandidates');

        meetingId = callDoc.id;

        pc.onicecandidate = async (event) => {
            event.candidate && await addDoc(offerCandidatesCollection, event.candidate.toJSON());
        };

        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        }

        await setDoc(doc(db, "calls", callDoc.id), offer);

        const unsubscribe = onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
        }

        const unsubscribeAnswerCandidates = onSnapshot(answerCandidatesCollection, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });
    });
    }

    const joinCall = async () => {
        let callDoc = doc(db, 'calls', meetingId);
        let answerCandidates = collection(callDoc, 'answerCandidates');
        let offerCandidates = collection(callDoc, 'offerCandidates')

        pc.onicecandidate = async (event) => {
            event.candidate && await addDoc(answerCandidates, event.candidate.toJSON());
        };

        const docSnap = await getDoc(callDoc);

        let callData;
        if (docSnap.exists()) {
            callData = docSnap.data();
        } else {
            console.log("No such document!");
        }

        const offerDescription = callData;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, { answer });

        const unsubscribe = onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
            console.log(change);
            if (change.type === 'added') {
                let data = change.doc.data();
                console.log(data);
                pc.addIceCandidate(new RTCIceCandidate(data));
            }
            });
      });

    }
</script>

<div class="w-screen h-screen flex flex-col items-center gap-6">
    <div class="mb-8 flex flex-col lg:flex-row w-full h-fit justify-around pt-20">
        <video class="w-[500px] h-[400px] bg-black" bind:this={webcamSrc} autoplay playsinline></video>
        <video class="w-[500px] h-[400px] bg-black" bind:this={remoteSrc} autoplay playsinline></video>
    </div>

    <Button on:click={startWebcam}>Start Webcam</Button>

    <Button on:click={startCall}>Create Call</Button>


    <div class="w-[300px]">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Join a meeting with code</label>
        <div class="mt-2">
          <Input bind:value={meetingId} type="email" placeholder="Meeting Id" />
        </div>
    </div>

    <Button on:click={joinCall}>Join Call</Button>
    
</div>