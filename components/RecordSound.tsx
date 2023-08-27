import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { sendAudioToOpenAI, sendAudioWithRetry } from "../src/SpeechToText";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Recording } from "expo-av/build/Audio";
import { TextToSpeech } from "../src/TextToSpeech";
import { GetData } from "../src/GetData";

const troubleshootingSteps = [
  "Ist der Ansaugschlauch in der Milch?",
  "Hat der Ansaugschlauch einen Knick?",
  "Kommt Wassserdampf aus der Milchdüse?",
  "Ok, ich glaube, Du brauchst einen Techniker.",
  "Ok, ich habe ein Ticket aufgemacht. In Kürze wird sich ein Techniker bei Dir melden. Danke."
];

export default function App({ setChatList, chatList }) {
  const [i, seti] = React.useState(0);
	const [recording, setRecording] = React.useState<Recording>();
	async function startRecording() {
		try {
			console.log("Requesting permissions..");
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			console.log("Starting recording..");
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			setRecording(recording);
			console.log("Recording started");
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	}

	async function stopRecording() {
		console.log("Stopping recording..");
		setRecording(undefined);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		});
		// create a read stream from recording
		const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    await new Promise((resolve) => setTimeout(resolve, 100))
    
		const parsedText = await sendAudioWithRetry(uri);

    chatList = [...chatList, { role: "user", text: parsedText }]
    setChatList(chatList);

    await new Promise((resolve) => setTimeout(resolve, Math.max(2000, Math.random()*3500)))
    

    const troubleShootInstruction = await GetData(parsedText) as string
		console.log("troubleShootInstruction", troubleShootInstruction)
		TextToSpeech(troubleShootInstruction);
    chatList = [...chatList, { role: "ai", text: troubleShootInstruction }]
    setChatList(chatList);
    seti(i+1);

		console.log("Recording stopped and stored at", uri);
	}

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TouchableOpacity>
				<Icon
					name={recording ? "stop" : "mic"}
					size={50}
					color={recording ? "red" : "green"}
					onPress={recording ? stopRecording : startRecording}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		padding: 10,
	},
});
