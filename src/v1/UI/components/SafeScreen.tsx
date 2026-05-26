import i18n from 'src/configs/translates/i18net';
import React, { ReactNode, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoading } from '../../logics/contexts/LoadingContext';
import { getAppLanguage } from '../../logics/services/LanguageService';

interface SafeScreenProps {
    children: ReactNode;
}

export default function SafeScreen({ children } : SafeScreenProps) {
    const insets = useSafeAreaInsets();

    const { hideLoading } = useLoading();

    useEffect(() => {
        (async () => {
            const lang = await getAppLanguage();
            await i18n.changeLanguage(lang);
            hideLoading()
        })();
    }, []);

    return (
        <KeyboardAvoidingView style={[styles.container, { paddingTop: insets.top }]}>
            {children}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

