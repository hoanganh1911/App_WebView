package com.example.iotapp.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.CompoundButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.SwitchCompat;
import androidx.fragment.app.Fragment;

import com.example.iotapp.R;
import com.google.android.material.slider.LabelFormatter;
import com.google.android.material.slider.Slider;

public class HomeFragment  extends Fragment {

    private WebView webView;
    private View mView;
    @Nullable
    @Override
        public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Ánh xạ đến web view
        mView = inflater.inflate(R.layout.fragment_home,container,false);
        webView = mView.findViewById(R.id.webviewHome);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://iotwatering-3893b.web.app/");
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAppCacheEnabled(true);
        return mView;
    }

}
