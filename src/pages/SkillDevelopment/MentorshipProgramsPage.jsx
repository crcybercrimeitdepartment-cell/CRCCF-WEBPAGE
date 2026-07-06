import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { heroData, sectionsData, constants, contentData, mentorshipProgramsData } from '../../data/skillDevelopment/MentorshipProgramsPageData';
import ComingSoonPage from '../common/ComingSoonPage';
import * as LucideIcons from 'lucide-react';
// ==========================================
// 0. INJECTED STYLES
// ==========================================
const styles = `
.mentorship-programs-page-wrapper {

/* ==========================================
   NEW HORIZONTAL PROGRAM CARDS STYLES
   ========================================== */

}

/* CSS Reset & Variable System */
.mentorship-programs-page-wrapper {
  /* Light Theme Variables */
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --border-hover: #cbd5e1;
  --text-main: #475569;
  --text-heading: #0f172a;
  --text-muted: #94a3b8;
  --text-secondary: #64748b;

  --accent-color: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-blue: #3b82f6;
  --accent-badge: #dbeafe;
  --accent-glow: rgba(37, 99, 235, 0.12);
  --accent-gradient: linear-gradient(90deg, #2563eb, #1d4ed8);
  --navbar-bg: #0f2b5b;

  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --card-hover-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.12), 0 10px 10px -5px rgba(37, 99, 235, 0.04);
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(226, 232, 240, 0.8);
  --glass-blur: blur(12px);

  --font-heading: 'Outfit', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.mentorship-programs-page-wrapper .dark-theme {
  /* Dark Theme Overrides aligned with blue/slate palette */
  --bg-primary: #080c16;
  --bg-secondary: #0e1325;
  --bg-tertiary: #161c33;
  --border-color: #1e2544;
  --border-hover: #2d3663;
  --text-main: #94a3b8;
  --text-heading: #f8fafc;
  --text-muted: #64748b;
  --text-secondary: #94a3b8;

  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --accent-blue: #3b82f6;
  --accent-badge: #1e2544;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --accent-gradient: linear-gradient(90deg, #3b82f6, #2563eb);
  --navbar-bg: #0b1329;

  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --card-hover-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.18), 0 10px 10px -5px rgba(59, 130, 246, 0.06);
  --glass-bg: rgba(14, 19, 37, 0.8);
  --glass-border: rgba(30, 37, 68, 0.8);
  --glass-blur: blur(16px);
}
.mentorship-programs-page-wrapper * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.mentorship-programs-page-wrapper {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-main);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}
.mentorship-programs-page-wrapper h1,
.mentorship-programs-page-wrapper h2,
.mentorship-programs-page-wrapper h3,
.mentorship-programs-page-wrapper h4 {
  font-family: var(--font-heading);
  color: var(--text-heading);
  font-weight: 700;
  line-height: 1.25;
}
.mentorship-programs-page-wrapper a {
  color: inherit;
  text-decoration: none;
}
/* Page Layout Container */
.mentorship-programs-page-wrapper .app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
/* Page scroll down animation */
@keyframes pageScrollDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.mentorship-programs-page-wrapper .main-content {
  flex-grow: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 60px 24px;
  animation: pageScrollDown 2.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}
/* Navbar Component */
.mentorship-programs-page-wrapper .navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--glass-bg);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.mentorship-programs-page-wrapper .navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mentorship-programs-page-wrapper .navbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.mentorship-programs-page-wrapper .logo-icon {
  color: var(--accent-color);
}
.mentorship-programs-page-wrapper .logo-text {
  display: flex;
  flex-direction: column;
}
.mentorship-programs-page-wrapper .brand-name {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--text-heading);
  line-height: 1;
}
.mentorship-programs-page-wrapper .brand-sub {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-color);
  font-weight: 600;
  margin-top: 2px;
}
.mentorship-programs-page-wrapper .navbar-actions {
  display: flex;
  align-items: center;
}
.mentorship-programs-page-wrapper .theme-toggle {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.mentorship-programs-page-wrapper .theme-toggle:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: scale(1.05);
}
.mentorship-programs-page-wrapper .theme-icon {
  transition: transform 0.5s ease;
}
.mentorship-programs-page-wrapper .theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
}
.mentorship-programs-page-wrapper .sun {
  color: #fbbf24;
}
.mentorship-programs-page-wrapper .moon {
  color: #6366f1;
}
/* Hero Banner */
.mentorship-programs-page-wrapper .hero-banner {
  padding: 50px 24px 10px 24px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mentorship-programs-page-wrapper .hero-banner h1 {
  font-size: 56px;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 16px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.mentorship-programs-page-wrapper .hero-subtitle {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 680px;
  margin-bottom: 36px;
}
/* Search Bar Styling */
.mentorship-programs-page-wrapper .search-container {
  width: 100%;
  max-width: 650px;
  margin-bottom: 10px;
}
.mentorship-programs-page-wrapper .search-bar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.mentorship-programs-page-wrapper .search-icon {
  position: absolute;
  left: 20px;
  color: var(--text-muted);
}
.mentorship-programs-page-wrapper .search-bar-wrapper input {
  width: 100%;
  padding: 16px 80px 16px 54px;
  font-family: var(--font-body);
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: #0f172a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.mentorship-programs-page-wrapper .search-bar-wrapper input::placeholder {
  color: #94a3b8;
}
.mentorship-programs-page-wrapper .search-bar-wrapper input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px var(--accent-glow), 0 8px 30px rgba(0, 0, 0, 0.05);
}
.mentorship-programs-page-wrapper .clear-search-btn {
  position: absolute;
  right: 18px;
  background-color: var(--bg-tertiary);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .clear-search-btn:hover {
  background-color: var(--border-color);
  color: var(--text-heading);
}
/* Catalog Filter Section */
.mentorship-programs-page-wrapper .catalog-section {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}
/* Cards Grid Layout */
.mentorship-programs-page-wrapper .cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 0;
}
/* Cards visible with screen */
.mentorship-programs-page-wrapper .screen-surface .cards-grid>* {
  opacity: 1;
  cursor: pointer;
  pointer-events: auto;
}
/* Screen unroll - slow rolling from top */
@keyframes screenUnroll {
  0% {
    max-height: 0;
    opacity: 0;
    transform: perspective(800px) rotateX(-4deg);
    transform-origin: top center;
  }

  5% {
    opacity: 1;
  }

  30% {
    transform: perspective(800px) rotateX(-2deg);
  }

  60% {
    transform: perspective(800px) rotateX(-0.5deg);
  }

  80% {
    transform: perspective(800px) rotateX(-0.1deg);
  }

  100% {
    max-height: 2000px;
    opacity: 1;
    transform: perspective(800px) rotateX(0deg);
    transform-origin: top center;
  }
}
/* ========== PULL-DOWN PROJECTOR SCREEN ========== */
.mentorship-programs-page-wrapper .projector-screen-wrapper {
  max-width: 1160px;
  margin: 10px auto 50px auto;
  position: relative;
  perspective: 1500px;
  transform-style: preserve-3d;
}
/* Metal housing / casing at top */
.mentorship-programs-page-wrapper .screen-housing {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 38px;
  position: relative;
  z-index: 10;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(59, 130, 246, 0.1);
}
.mentorship-programs-page-wrapper .housing-cap {
  width: 16px;
  height: 38px;
  background: linear-gradient(180deg, #d8d8d8 0%, #b8b8b8 40%, #909090 100%);
  border: 1px solid #888;
  border-top: 1px solid #ffffff;
}
.mentorship-programs-page-wrapper .housing-cap-left {
  border-radius: 8px 0 0 8px;
  border-right: none;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2);
}
.mentorship-programs-page-wrapper .housing-cap-right {
  border-radius: 0 8px 8px 0;
  border-left: none;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}
.housing-.mentorship-programs-page-wrapper {
  flex: 1;
  height: 38px;
  background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 20%, #cdcdcd 75%, #a0a0a0 100%);
  border-top: 1px solid #ffffff;
  border-bottom: 2px solid #777777;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}
.mentorship-programs-page-wrapper .housing-body::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
}
.mentorship-programs-page-wrapper .housing-brand {
  font-family: var(--font-heading);
  font-size: 11.5px;
  font-weight: 800;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}
/* Screen surface */
.mentorship-programs-page-wrapper .screen-surface {
  background: #e8edf5;
  border: 12px solid #111111;
  border-top: 4px solid #111111;
  border-bottom: 2px solid #111111;
  position: relative;
  overflow: hidden;
  box-shadow:
    inset 0 0 30px rgba(0, 0, 0, 0.4),
    inset 0 0 60px rgba(59, 130, 246, 0.05),
    0 15px 35px rgba(0, 0, 0, 0.5),
    0 5px 15px rgba(0, 0, 0, 0.3),
    0 0 80px rgba(59, 130, 246, 0.08);
  animation: screenUnroll 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  transform-origin: top center;
  cursor: none;
}
/* Subtle fabric texture on screen */
.mentorship-programs-page-wrapper .screen-surface::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.003) 2px,
      rgba(0, 0, 0, 0.003) 4px);
  pointer-events: none;
  z-index: 2;
}
/* Light reflection on screen surface - Projector light falling from bottom */
.mentorship-programs-page-wrapper .screen-surface::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.5) 0%, rgba(200, 220, 255, 0.25) 15%, rgba(59, 130, 246, 0.1) 35%, transparent 65%),
    radial-gradient(ellipse at 50% 100%, rgba(180, 210, 255, 0.2) 0%, transparent 45%);
  pointer-events: none;
  z-index: 4;
  mix-blend-mode: screen;
  animation: projectorFlicker 5s ease-in-out infinite;
}
/* Extra projector light cone overlay on screen */
.mentorship-programs-page-wrapper .screen-surface-inner::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 100%;
  background: radial-gradient(ellipse at 50% 100%,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(200, 220, 255, 0.15) 12%,
      rgba(59, 130, 246, 0.06) 30%,
      transparent 55%);
  pointer-events: none;
  z-index: 1;
  animation: projectorFlicker 5s ease-in-out infinite;
}
.mentorship-programs-page-wrapper .screen-surface-inner {
  position: relative;
  z-index: 3;
  padding: 24px 28px 28px 28px;
  min-height: 410px;
  cursor: none;
}
/* Wall shadow behind screen - enhanced for dark background */
.mentorship-programs-page-wrapper .projector-screen-wrapper::after {
  content: '';
  position: absolute;
  top: 40px;
  left: 2%;
  right: 2%;
  bottom: 20px;
  background: radial-gradient(ellipse at 50% 60%, rgba(59, 130, 246, 0.08) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 80%);
  z-index: -1;
}
/* Realistic CSS Hand Holding Board Marker */
.mentorship-programs-page-wrapper .css-hand-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 60px;
  z-index: 25;
  pointer-events: none;
  will-change: transform, opacity;
  transition: opacity 0.3s ease, filter 0.2s ease, transform 0.08s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: 0px 30px;
  /* Pivot exactly on the tip */
  filter: drop-shadow(4px 6px 8px rgba(0, 0, 0, 0.25));
}
/* Marker Back Cap */
.mentorship-programs-page-wrapper .marker-back-cap {
  position: absolute;
  left: 91px;
  top: 22px;
  width: 14px;
  height: 16px;
  background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
  border-radius: 0 4px 4px 0;
  z-index: 3;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}
/* Marker Body */
.marker-.mentorship-programs-page-wrapper {
  position: absolute;
  left: 16px;
  top: 22px;
  width: 75px;
  height: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 40%, #e2e8f0 100%);
  border: 0.5px solid #cbd5e1;
  border-radius: 1px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding-left: 25px;
  overflow: hidden;
}
/* Smart Board Marker - Realistic EXPO Marker */
.mentorship-programs-page-wrapper .marker-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%);
}
.mentorship-programs-page-wrapper .marker-label {
  font-size: 6px;
  font-weight: 900;
  color: #1e40af;
  letter-spacing: 0.5px;
}
.mentorship-programs-page-wrapper .marker-sublabel {
  font-size: 3px;
  color: #64748b;
  margin-left: 2px;
}
/* Collar before tip */
.mentorship-programs-page-wrapper .marker-collar {
  position: absolute;
  left: 8px;
  top: 25px;
  width: 8px;
  height: 10px;
  background: linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%);
  border: 0.5px solid #94a3b8;
  border-radius: 1px;
  z-index: 2;
}
/* Marker Ink Tip */
.mentorship-programs-page-wrapper .marker-tip {
  position: absolute;
  left: 0;
  top: 27px;
  width: 8px;
  height: 6px;
  background: #2563eb;
  border-radius: 3px 0 0 3px;
  z-index: 2;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}
/* Clickable Hover feedback */
.mentorship-programs-page-wrapper .css-hand-marker.clickable-hover {
  filter: drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.35)) scale(0.96);
}
.mentorship-programs-page-wrapper .css-hand-marker.clickable-hover .marker-tip {
  box-shadow:
    inset 0 0 2px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(37, 99, 235, 0.9);
  background: #3b82f6;
  /* slightly brighter blue on hover */
}
/* Mouse Down Press Animation */
.mentorship-programs-page-wrapper .css-hand-marker.mouse-down {
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.4)) scale(0.92);
}
@keyframes projectorFlicker {

  0%,
  100% {
    opacity: 1;
  }

  30% {
    opacity: 0.92;
  }

  60% {
    opacity: 1;
  }

  80% {
    opacity: 0.95;
  }
}
/* ===== DARK THEME PROJECTOR SCREEN ===== */
.mentorship-programs-page-wrapper .dark-theme .housing-cap {
  background: linear-gradient(180deg, #444 0%, #333 40%, #252525 100%);
  border-color: #222;
}
.mentorship-programs-page-wrapper .dark-theme .housing-cap-left {
  box-shadow: -3px 2px 6px rgba(0, 0, 0, 0.3);
}
.mentorship-programs-page-wrapper .dark-theme .housing-cap-right {
  box-shadow: 3px 2px 6px rgba(0, 0, 0, 0.3);
}
.dark-theme .housing-.mentorship-programs-page-wrapper {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 20%, #1e1e1e 80%, #151515 100%);
  border-top-color: #444;
  border-bottom-color: #111;
}
.mentorship-programs-page-wrapper .dark-theme .housing-body::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}
.mentorship-programs-page-wrapper .dark-theme .housing-brand {
  color: #888;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
}
.mentorship-programs-page-wrapper .dark-theme .screen-surface {
  background: #e8edf5;
  border-color: #0b0c0f;
}
.mentorship-programs-page-wrapper .dark-theme .screen-surface::before {
  background: repeating-linear-gradient(0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.005) 2px,
      rgba(255, 255, 255, 0.005) 4px);
}
.mentorship-programs-page-wrapper .dark-theme .screen-surface::after {
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.25) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 80%);
}
.mentorship-programs-page-wrapper .dark-theme .projector-screen-wrapper::after {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
}
.mentorship-programs-page-wrapper .dark-theme .screen-surface::after {
  background:
    radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.55) 0%, rgba(200, 220, 255, 0.3) 20%, rgba(59, 130, 246, 0.12) 40%, transparent 70%),
    radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 40%);
}
.mentorship-programs-page-wrapper .dark-theme .screen-surface-inner::after {
  background: radial-gradient(ellipse at 50% 100%,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(200, 220, 255, 0.18) 15%,
      rgba(59, 130, 246, 0.08) 35%,
      transparent 60%);
}
/* Pagination Row Styling */
.mentorship-programs-page-wrapper .pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}
.mentorship-programs-page-wrapper .pagination-arrow-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .pagination-arrow-btn:hover:not(:disabled) {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-1px);
}
.mentorship-programs-page-wrapper .pagination-arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.mentorship-programs-page-wrapper .pagination-numbers {
  display: flex;
  gap: 8px;
}
.mentorship-programs-page-wrapper .pagination-num-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  min-width: 40px;
  height: 40px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .pagination-num-btn:hover {
  border-color: var(--border-hover);
  background-color: var(--bg-tertiary);
}
.mentorship-programs-page-wrapper .pagination-num-btn.active {
  background: var(--accent-gradient);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.25);
}
/* Empty State / Not Found State */
.mentorship-programs-page-wrapper .empty-state {
  text-align: center;
  padding: 60px 24px;
  background-color: var(--bg-secondary);
  border: 1px dashed var(--border-color);
  border-radius: 20px;
  max-width: 500px;
  margin: 40px auto;
}
.mentorship-programs-page-wrapper .empty-state h3 {
  font-size: 20px;
  margin-bottom: 8px;
}
.mentorship-programs-page-wrapper .empty-state p {
  color: var(--text-muted);
  margin-bottom: 24px;
}
.mentorship-programs-page-wrapper .reset-filters-btn {
  background: var(--accent-gradient);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.mentorship-programs-page-wrapper .reset-filters-btn:hover {
  opacity: 0.9;
}
/* Program Detailed Modal & Application Form */
.mentorship-programs-page-wrapper .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.mentorship-programs-page-wrapper .modal-content {
  position: relative;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 28px;
  width: 100%;
  max-width: 950px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  scrollbar-width: thin;
}
.mentorship-programs-page-wrapper .modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .modal-close-btn:hover {
  background-color: var(--border-color);
  color: var(--text-heading);
  transform: rotate(90deg);
}
.mentorship-programs-page-wrapper .modal-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 550px;
}
/* Modal Left Column (Details) */
.mentorship-programs-page-wrapper .modal-details-col {
  padding: 40px;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}
.mentorship-programs-page-wrapper .modal-category {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 8px;
}
.mentorship-programs-page-wrapper .modal-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
}
.mentorship-programs-page-wrapper .modal-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.mentorship-programs-page-wrapper .modal-badges .badge {
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--bg-tertiary);
  color: var(--text-main);
}
.mentorship-programs-page-wrapper .modal-badges .badge.level {
  background-color: var(--accent-glow);
  color: var(--accent-color);
}
.mentorship-programs-page-wrapper .badge-icon {
  opacity: 0.8;
}
.mentorship-programs-page-wrapper .modal-section {
  margin-bottom: 28px;
}
.mentorship-programs-page-wrapper .modal-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.mentorship-programs-page-wrapper .sec-icon {
  color: var(--accent-color);
}
/* Timeline Layout for Curriculum */
.mentorship-programs-page-wrapper .curriculum-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-left: 20px;
}
.mentorship-programs-page-wrapper .curriculum-timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 5px;
  width: 2px;
  background-color: var(--border-color);
}
.mentorship-programs-page-wrapper .timeline-item {
  position: relative;
}
.mentorship-programs-page-wrapper .timeline-marker {
  position: absolute;
  left: -27px;
  top: 2px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mentorship-programs-page-wrapper .timeline-content p {
  font-size: 14px;
  color: var(--text-main);
  font-weight: 500;
}
/* Skills Chip List */
.mentorship-programs-page-wrapper .modal-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.mentorship-programs-page-wrapper .modal-skill-chip {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-heading);
}
/* Modal Right Column (Form) */
.mentorship-programs-page-wrapper .modal-form-col {
  padding: 40px;
  background-color: var(--bg-tertiary);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mentorship-programs-page-wrapper .enrollment-form h3 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
}
.mentorship-programs-page-wrapper .form-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
}
.mentorship-programs-page-wrapper .form-group {
  margin-bottom: 18px;
}
.mentorship-programs-page-wrapper .form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text-heading);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.mentorship-programs-page-wrapper .input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.mentorship-programs-page-wrapper .input-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
}
.mentorship-programs-page-wrapper .input-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-heading);
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .input-wrapper input:focus,
.mentorship-programs-page-wrapper .form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
.mentorship-programs-page-wrapper .input-wrapper input.error,
.mentorship-programs-page-wrapper .form-group textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
.mentorship-programs-page-wrapper .form-group textarea {
  width: 100%;
  padding: 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-heading);
  resize: vertical;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .error-text {
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  display: block;
  margin-top: 4px;
}
.mentorship-programs-page-wrapper .submit-application-btn {
  background: var(--accent-gradient);
  border: none;
  color: #ffffff;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
  transition: opacity 0.2s;
}
.mentorship-programs-page-wrapper .submit-application-btn:hover {
  opacity: 0.95;
}
/* Success Feedback Panel */
.mentorship-programs-page-wrapper .success-state {
  text-align: center;
  padding: 20px;
}
.mentorship-programs-page-wrapper .success-icon {
  color: #10b981;
  margin-bottom: 20px;
}
.mentorship-programs-page-wrapper .success-state h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text-heading);
}
.mentorship-programs-page-wrapper .success-state p {
  font-size: 14px;
  color: var(--text-main);
  margin-bottom: 24px;
  line-height: 1.6;
}
.mentorship-programs-page-wrapper .success-close-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 10px 28px;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-heading);
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .success-close-btn:hover {
  background-color: var(--bg-primary);
  border-color: var(--border-hover);
}
/* Footer Component */
.mentorship-programs-page-wrapper .footer {
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  padding: 60px 24px 30px 24px;
  margin-top: 80px;
}
.mentorship-programs-page-wrapper .footer-top {
  max-width: 1400px;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.mentorship-programs-page-wrapper .footer-brand {
  max-width: 400px;
}
.mentorship-programs-page-wrapper .footer-brand h3 {
  font-size: 20px;
  font-weight: 850;
  margin-bottom: 12px;
}
.mentorship-programs-page-wrapper .footer-brand p {
  color: var(--text-muted);
  font-size: 14px;
}
.mentorship-programs-page-wrapper .footer-links {
  display: flex;
  gap: 60px;
}
.mentorship-programs-page-wrapper .link-group h4 {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  color: var(--accent-color);
}
.mentorship-programs-page-wrapper .link-group ul {
  list-style: none;
}
.mentorship-programs-page-wrapper .link-group ul li {
  margin-bottom: 8px;
}
.mentorship-programs-page-wrapper .link-group ul li a {
  font-size: 14px;
  color: var(--text-main);
  transition: color 0.2s;
}
.mentorship-programs-page-wrapper .link-group ul li a:hover {
  color: var(--accent-color);
}
.mentorship-programs-page-wrapper .footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
}
.mentorship-programs-page-wrapper .social-links {
  display: flex;
  gap: 16px;
}
.mentorship-programs-page-wrapper .social-links a {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.mentorship-programs-page-wrapper .social-links a:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: #ffffff;
  transform: translateY(-2px);
}
.mentorship-programs-page-wrapper .crafted {
  display: flex;
  align-items: center;
  gap: 4px;
}
.mentorship-programs-page-wrapper .heart-icon {
  color: #ef4444;
}
/* Responsiveness adjustments */
@media (max-width: 1024px) {
  .mentorship-programs-page-wrapper .hero-banner h1 {
    font-size: 42px;
  }

  .mentorship-programs-page-wrapper .modal-layout {
    grid-template-columns: 1fr;
  }

  .mentorship-programs-page-wrapper .modal-details-col {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
@media (max-width: 768px) {
  .mentorship-programs-page-wrapper .hero-banner {
    padding-top: 48px;
    padding-bottom: 40px;
  }

  .mentorship-programs-page-wrapper .hero-banner h1 {
    font-size: 32px;
  }

  .mentorship-programs-page-wrapper .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .mentorship-programs-page-wrapper .footer-top {
    flex-direction: column;
    gap: 32px;
  }

  .mentorship-programs-page-wrapper .footer-links {
    flex-wrap: wrap;
    gap: 40px;
  }

  .mentorship-programs-page-wrapper .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
@media (max-width: 480px) {
  .mentorship-programs-page-wrapper .modal-content {
    border-radius: 16px;
  }

  .mentorship-programs-page-wrapper .modal-details-col,
  .mentorship-programs-page-wrapper .modal-form-col {
    padding: 20px;
  }

  .mentorship-programs-page-wrapper .cards-grid {
    grid-template-columns: 1fr;
  }

  .mentorship-programs-page-wrapper .projector-screen-wrapper {
    margin-left: -4px;
    margin-right: -4px;
  }

  .mentorship-programs-page-wrapper .housing-cap {
    width: 10px;
    height: 28px;
  }

  .housing-.mentorship-programs-page-wrapper {
    height: 28px;
  }

  .mentorship-programs-page-wrapper .housing-brand {
    font-size: 9px;
    letter-spacing: 1.5px;
  }

  .mentorship-programs-page-wrapper .screen-surface {
    border-left-width: 3px;
    border-right-width: 3px;
    min-height: 380px;
  }

  .mentorship-programs-page-wrapper .screen-surface-inner {
    padding: 14px 12px 18px 12px;
    min-height: 340px;
  }
}
@media (max-width: 768px) {
  .mentorship-programs-page-wrapper .screen-surface {
    min-height: 340px;
  }

  .mentorship-programs-page-wrapper .screen-surface-inner {
    padding: 18px 16px 22px 16px;
    min-height: 300px;
  }
}
.mentorship-programs-page-wrapper .new-program-card {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow:
    0 10px 20px -5px rgba(0, 0, 0, 0.04),
    0 4px 6px -4px rgba(0, 0, 0, 0.03);
  border: 1.5px solid #cbd5e1;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  width: 100%;
  pointer-events: auto;
}
.mentorship-programs-page-wrapper .new-program-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.07),
    0 10px 10px -5px rgba(0, 0, 0, 0.03);
}
.mentorship-programs-page-wrapper .new-program-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  box-shadow:
    0 4px 8px -2px rgba(0, 0, 0, 0.06),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.mentorship-programs-page-wrapper .new-program-card:hover .new-program-icon-wrapper {
  transform: scale(1.08);
  box-shadow:
    0 6px 14px -3px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
}
.mentorship-programs-page-wrapper .new-program-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  margin-left: 14px;
  text-align: left;
  flex-grow: 1;
}
.mentorship-programs-page-wrapper .new-program-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
  margin: 0;
}
.mentorship-programs-page-wrapper .new-program-know-more {
  font-size: 11.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: color 0.2s;
}
.mentorship-programs-page-wrapper .know-more-arrow {
  transition: transform 0.2s ease;
}
.mentorship-programs-page-wrapper .new-program-card:hover .know-more-arrow {
  transform: translateX(3px);
}
`;

function StyleInjector() {
  return <style>{styles}</style>;
}


// ==========================================
// 1. MENTORSHIP CARD COMPONENT
// ==========================================
const { iconConfig } = contentData;

function getProgramIconInfo(program) {
  const info = iconConfig[program.id];
  if (info) {
    return {
      ...info,
      icon: LucideIcons[info.icon] || LucideIcons.GraduationCap
    };
  }
  const hash = (program.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbackColors = [
    { color: '#6366f1', bg: '#eef2ff',   border: 'rgba(99,102,241,0.18)' },
    { color: '#ec4899', bg: '#fdf2f8',   border: 'rgba(236,72,153,0.18)' },
    { color: '#f97316', bg: '#fff7ed',   border: 'rgba(249,115,22,0.18)' },
    { color: '#10b981', bg: '#ecfdf5',   border: 'rgba(16,185,129,0.18)' },
    { color: '#0ea5e9', bg: '#f0f9ff',   border: 'rgba(14,165,233,0.18)' },
    { color: '#8b5cf6', bg: '#f5f3ff',   border: 'rgba(139,92,246,0.18)' },
  ];
  const pick = fallbackColors[hash % fallbackColors.length];
  return { icon: LucideIcons.GraduationCap, ...pick };
}

function MentorshipCard({ program, onLearnMore }) {
  const { icon: IconComponent, color, bg, border } = getProgramIconInfo(program);

  return (
    <motion.div
      className="new-program-card"
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      onClick={() => onLearnMore(program)}
    >
      <div
        className="new-program-icon-wrapper"
        style={{
          color: color,
          backgroundColor: bg,
          border: `1.5px solid ${border}`,
        }}
      >
        <IconComponent size={22} strokeWidth={2} />
      </div>
      <div className="new-program-details">
        <h4 className="new-program-title">{program.title}</h4>
        <span className="new-program-know-more" style={{ color: color }}>
          Know More <ArrowRight size={12} className="know-more-arrow" />
        </span>
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. PAGINATION COMPONENT
// ==========================================
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-arrow-btn"
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="pagination-numbers">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`pagination-num-btn ${currentPage === num ? 'active' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-arrow-btn"
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ==========================================
// 3. HOME PAGE COMPONENT
// ==========================================
function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const markerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    const clickable = target.closest('a, button, .new-program-card, .pagination-btn');
    setIsHoveringClickable(!!clickable);
  }, []);

  const { CARDS_PER_PAGE } = constants;

  const filteredPrograms = useMemo(() => {
    return mentorshipProgramsData.filter((program) => {
      const matchesCategory = activeCategory === 'All' || program.category === activeCategory;
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPrograms.length / CARDS_PER_PAGE);
  const displayedPrograms = useMemo(() => {
    const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredPrograms.slice(startIdx, startIdx + CARDS_PER_PAGE);
  }, [filteredPrograms, currentPage]);

  const handleExploreProgram = (program) => {
    navigate(`program/${program.id}`);
  };

  return (
    <>
      <main className="main-content" key={currentPage}>
        <header className="hero-banner">
          <h1>{heroData.title}</h1>
          <p className="hero-subtitle">{heroData.subtitle}</p>

          <div className="search-container">
            <div className="search-bar-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder={heroData.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                aria-label="Search programs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="clear-search-btn" aria-label="Clear search">Clear</button>
              )}
            </div>
          </div>
        </header>

        <section className="catalog-section">
          {displayedPrograms.length > 0 ? (
            <>
              <div className="projector-screen-wrapper">
                <div className="screen-housing">
                  <div className="housing-cap housing-cap-left"></div>
                  <div className="housing-body">
                    <span className="housing-brand">{sectionsData.housingBrand}</span>
                  </div>
                  <div className="housing-cap housing-cap-right"></div>
                </div>
                <div
                  className="screen-surface"
                  onMouseEnter={() => { if (markerRef.current) markerRef.current.style.opacity = '1'; }}
                  onMouseLeave={() => { setIsMouseDown(false); if (markerRef.current) markerRef.current.style.opacity = '0'; }}
                  onMouseDown={() => setIsMouseDown(true)}
                  onMouseUp={() => setIsMouseDown(false)}
                  onMouseOver={handleMouseOver}
                  onMouseMove={(e) => {
                    if (markerRef.current) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const rotation = isMouseDown ? 40 : 32;
                      const pressOffset = isMouseDown ? 1.5 : 0;
                      markerRef.current.style.transform = `translate(${x}px, ${y - 30 + pressOffset}px) rotate(${rotation}deg)`;
                    }
                  }}
                >
                  <div className="screen-surface-inner">
                    <div className="cards-grid">
                      {displayedPrograms.map((program) => (
                        <MentorshipCard key={program.id} program={program} onLearnMore={handleExploreProgram} />
                      ))}
                    </div>
                  </div>
                  <div
                    className={`css-hand-marker ${isHoveringClickable ? 'clickable-hover' : ''} ${isMouseDown ? 'mouse-down' : ''}`}
                    ref={markerRef}
                    style={{ left: 0, top: 0, bottom: 'auto', right: 'auto', opacity: 0, transform: `translate(50px, 40px) rotate(32deg)` }}
                  >
                    <div className="hand-wrist"></div>
                    <div className="hand-palm"></div>
                    <div className="hand-finger finger-middle"></div>
                    <div className="hand-finger finger-ring"></div>
                    <div className="hand-finger finger-pinky"></div>
                    <div className="marker-back-cap"></div>
                    <div className="marker-body">
                      <div className="marker-shine"></div>
                      <div className="marker-label">EXPO</div>
                      <div className="marker-sublabel">low-odor</div>
                    </div>
                    <div className="marker-collar"></div>
                    <div className="marker-tip"></div>
                    <div className="hand-finger finger-index">
                      <div className="finger-nail index-nail"></div>
                    </div>
                    <div className="hand-finger finger-thumb">
                      <div className="finger-nail thumb-nail"></div>
                    </div>
                  </div>
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          ) : (
            <div className="empty-state">
              <h3>No Programs Found</h3>
              <p>We couldn't find any mentorship programs matching your filters or search keywords. Try adjusting your query.</p>
              <button className="reset-filters-btn" onClick={() => { setActiveCategory('All'); setSearchQuery(''); setCurrentPage(1); }}>Reset Filters</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

// ==========================================
// 4. PROGRAM DETAIL PAGE COMPONENT
// ==========================================
function ProgramDetail() {
  return <ComingSoonPage />;
}

// ==========================================
// 5. SUCCESS COMPONENT
// ==========================================
function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  return (
    <>
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', padding: '40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', boxShadow: 'var(--card-shadow)' }}>
          <CheckCircle size={72} style={{ color: '#10b981', margin: '0 auto 24px auto', display: 'block' }} className="animate-pulse" />
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-heading)', textAlign: 'center' }}>Application Received!</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '32px' }}>
            Congratulations <strong>{state.name || 'Applicant'}</strong>, your request for the <strong>{state.programTitle || 'Mentorship Program'}</strong> has been securely logged.
            We have dispatched an email confirmation to <strong>{state.email || 'your email'}</strong>. An onboarding advisor will review your goals and reach out to organize your introductory call.
          </p>
          <button onClick={() => navigate('/')} className="reset-filters-btn" style={{ width: '100%', padding: '14px' }}>
            Return to Dashboard
          </button>
        </div>
      </main>
    </>
  );
}

// ==========================================
// 6. SCROLL TO TOP
// ==========================================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ==========================================
// 7. APP ROUTES
// ==========================================
export default function MentorshipProgramsPage() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="mentorship-programs-page-wrapper">
          <div className="app-container dark-theme">
            <StyleInjector />
            <ScrollToTop />
            <Home />
          </div>
        </div>
      } />
      <Route path="program/:id" element={
        <>
          <ScrollToTop />
          <ProgramDetail />
        </>
      } />
      <Route path="success" element={<Success />} />
    </Routes>
  );
}
