package com.example.iotapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.example.iotapp.fragment.HomeFragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;

    public class MainActivity extends AppCompatActivity {
        private BottomNavigationView mbottomNavigationView;
        private ViewPager mViewPager;
        private MyViewPagerAdapter myViewPagerAdapter;


        @Override
            protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            mbottomNavigationView = findViewById(R.id.bottom_navigation);
            mViewPager = findViewById(R.id.view_paper);

            myViewPagerAdapter = new MyViewPagerAdapter(getSupportFragmentManager(), FragmentStatePagerAdapter.BEHAVIOR_SET_USER_VISIBLE_HINT);
            mViewPager.setAdapter(myViewPagerAdapter);

            mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
                @Override
                public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                }

                @Override
                public void onPageSelected(int position) {

                    switch (position) {
                        case 0:
                            mbottomNavigationView.getMenu().findItem(R.id.menu_home).setChecked(true);

                            break;
                        case 1:
                            mbottomNavigationView.getMenu().findItem(R.id.menu_setting).setChecked(true);
                            break;
                        case 2:
                            mbottomNavigationView.getMenu().findItem(R.id.menu_wificonfig).setChecked(true);
                            break;
                    }
                }

                @Override
                public void onPageScrollStateChanged(int state) {
                }
            });
            mbottomNavigationView.setOnNavigationItemSelectedListener(item -> {
                switch (item.getItemId()) {
                    case R.id.menu_home:
                        mViewPager.setCurrentItem(0);
                        break;
                    case R.id.menu_setting:
                        mViewPager.setCurrentItem(1);
                        break;
                    case R.id.menu_wificonfig:
                        mViewPager.setCurrentItem(2);
                        break;
                }
                return true;
            });

        }
    }

