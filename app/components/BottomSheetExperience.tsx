import React, { useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';

interface BottomSheetExperienceRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetExperienceProps {
  onClose?: () => void;
}

const BottomSheetExperience = forwardRef<BottomSheetExperienceRef, BottomSheetExperienceProps>(
  ({ onClose }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['95%'], []); 

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        onClose?.();
      }
    }, [onClose]);

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.expand();
      },
      close: () => {
        bottomSheetRef.current?.close();
      }
    }));

    const handleClose = () => {
      bottomSheetRef.current?.close();
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Experience</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.subtitle}>Add your professional experience</Text>
          </View>

          <View>
            <TextInput
              placeholder="Job Title"
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Company Name"
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Job Description"
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Add Experience</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#FFD700',
    width: 40,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#C0C0C0',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  editButtonText: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
});

export default BottomSheetExperience;