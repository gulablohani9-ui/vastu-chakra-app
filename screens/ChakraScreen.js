import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Slider } from 'react-native';
import Svg, { Circle, Line, G, Text as SvgText } from 'react-native-svg';

export default function ChakraScreen({ plotData, onNext }) {
  const [rotation, setRotation] = useState(plotData.frontDegree || 0);
  const center = plotData.center.x !== 0 ? plotData.center : { x: 175, y: 175 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Automatic Chakra Alignment & Manual Rotation</Text>
      
      <View style={styles.chakraBox}>
        <Svg height="350" width="350">
          <G rotation={rotation} origin={`${center.x}, ${center.y}`}>
            <Circle cx={center.x} cy={center.y} r="140" stroke="#00BCD4" strokeWidth="4" fill="none" />
            <Circle cx={center.x} cy={center.y} r="100" stroke="#FFC107" strokeWidth="2" fill="none" />
            <Line x1={center.x} y1={center.y} x2={center.x} y2={center.y - 140} stroke="#FF5722" strokeWidth="3" />
            <SvgText x={center.x - 15} y={center.y - 145} fill="#FFF" fontSize="14">NORTH</SvgText>
          </G>
          <Circle cx={center.x} cy={center.y} r="5" fill="#FFF" />
        </Svg>
      </View>

      <Text style={styles.label}>Rotate Chakra Manually: {rotation.toFixed(1)}°</Text>
      <View style={{ width: '80%', marginVertical: 20 }}>
        {/* Use @react-native-community/slider in native build */}
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={rotation.toString()} 
          onChangeText={(val) => setRotation(parseFloat(val) || 0)} 
        />
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={onNext}><Text style={styles.btnText}>Generate A4 PDF Report</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#121212' },
  title: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  chakraBox: { width: 350, height: 350, backgroundColor: '#1E1E1E', borderRadius: 175, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  label: { color: '#AAA', marginTop: 15, fontSize: 16 },
  input: { backgroundColor: '#2A2A2A', color: '#FFF', padding: 10, borderRadius: 8, textAlign: 'center', fontSize: 18 },
  nextBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
