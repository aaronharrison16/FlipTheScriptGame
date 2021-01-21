package com.flipthescript;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public class ReverseAudioModule extends ReactContextBaseJavaModule {
    AudioTrack audioTrack;
    FileInputStream is;

    ReverseAudioModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ReverseAudioModule";
    }

    @ReactMethod
    public void reverseAudioRecordingEvent(String filePath) {
        int minBufferSize = AudioTrack.getMinBufferSize(44100, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT);
        audioTrack = new AudioTrack(AudioManager.STREAM_MUSIC, 44100, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT, minBufferSize, AudioTrack.MODE_STREAM);

        audioTrack.play();

        byte [] buffer = new byte[2048];
        File file = new File(filePath);

        try {
            is = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        try {
            buffer = convertStreamToByteArray(is, 2048);
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        audioTrack.write(buffer, 0, buffer.length);

         try {
             is.close();
         } catch (Exception e) {
             e.printStackTrace();
         }
    }

    public static byte[] convertStreamToByteArray(InputStream is, int size) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buff = new byte[size];
        int i = Integer.MAX_VALUE;
        while ((i = is.read(buff, 0, buff.length)) > 0) {
            byteArrayOutputStream.write(buff, 0, i);
        }
        return reverse(byteArrayOutputStream.toByteArray());
    }

    static public byte[] reverse(byte[] array) {
        if (array == null) {
            return null;
        }

        byte[] result = new byte[array.length];

        for ( int i = 0 ; i < 45 ; i++ ) {
            result[i] = array[i];
        }

        int z = array.length;

        for (int l= 45; l < array.length; l++ ) {
            byte value1 = array[z-l];
            result[l] = value1;
        }
        return result;
    }
}
