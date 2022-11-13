package com.example.iotapp.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.iotapp.R;

public class SettingFragment extends Fragment {
    private WebView webViewSetting;
    private View mViewSetting;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Ánh xạ đến web view
        mViewSetting = inflater.inflate(R.layout.fragment_setting,container,false);
        webViewSetting = mViewSetting.findViewById(R.id.webviewSetting);
        webViewSetting.setWebViewClient(new WebViewClient());
        webViewSetting.loadUrl("https://iotwatering-3893b.web.app/setting.html");
        WebSettings webSettings = webViewSetting.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAppCacheEnabled(false);
        return mViewSetting;
    }

}
