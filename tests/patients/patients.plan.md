# Patients Management Page Test Plan

## Application Overview

The Patients Management page (ユーザー管理) at https://qa.nonprod-store.myalcon.com/mas/patients?h=myPatients is a B2B2C portal for optical stores in Japan (MyAlcon MARLÖ). It requires authentication and provides patient/user management capabilities including: listing patients with filters and search, registering new patients, viewing patient detail profiles with prescriptions (指示書), order history, regular delivery plans, and coupons. Each patient row has a contextual "more" menu with quick actions (edit, individual order, create prescription).

## Test Scenarios

### 1. Authentication & Access Control

**Seed:** `tests/patients/seed.spec.ts`

#### 1.1. Unauthenticated user is redirected to login page

**File:** `tests/patients/auth-access.spec.ts`

**Steps:**
  1. Open a fresh browser with no session cookies
    - expect: Browser starts with a blank session
  2. Navigate directly to https://qa.nonprod-store.myalcon.com/mas/patients?h=myPatients
    - expect: User is redirected away from the patients page
    - expect: The MARLÖ Japan home page or login page is displayed
    - expect: The URL does not remain on /mas/patients

#### 1.2. Authenticated user can access the patients page

**File:** `tests/patients/auth-access.spec.ts`

**Steps:**
  1. Navigate to https://qa.nonprod-store.myalcon.com/jp and click ログイン (Login)
    - expect: MyAlcon ID login page is displayed at q-id.myalcon.com
  2. Enter valid credentials (email: marloint.test+b2b2cnewuser@alconlabs.com, password: Bangalore##88) and submit
    - expect: User is redirected to the /mas dashboard after successful authentication
  3. Navigate to https://qa.nonprod-store.myalcon.com/mas/patients?h=myPatients
    - expect: Page title shows ユーザー - MARLÖ
    - expect: Patient list is displayed with patient count (e.g. 99)
    - expect: Three tabs are visible: ユーザー管理, 指示書, MARLO定期デリバリー

### 2. Patient List – Display & Pagination

**Seed:** `tests/patients/seed.spec.ts`

#### 2.1. Patient list loads with correct columns and count

**File:** `tests/patients/patient-list.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patients page loads successfully
  2. Verify the patient list table is visible
    - expect: Columns displayed: 氏名 (Name), メールアドレス (Email), 電話番号 (Phone), 指示書 (Prescription), 登録状況 (Registration status)
    - expect: Each row shows patient name as a clickable link
    - expect: Total patient count is shown in the heading (e.g. (99))
  3. Verify pagination controls are present at the bottom
    - expect: Rows per page selector shows default of 20
    - expect: Pagination text shows e.g. 1-20 の 99
    - expect: Previous page button is disabled on first page
    - expect: Next page button is enabled

#### 2.2. Pagination navigates to next page

**File:** `tests/patients/patient-list.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: First page of patients is shown
  2. Click the Next page button
    - expect: Second page of patients is loaded
    - expect: Pagination text updates to e.g. 21-40 の 99
    - expect: Previous page button becomes enabled
  3. Click the Previous page button
    - expect: Returns to the first page
    - expect: Pagination text shows 1-20 の 99
    - expect: Previous page button becomes disabled again

#### 2.3. Name column can be sorted

**File:** `tests/patients/patient-list.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is loaded
  2. Click the 氏名 (Name) column header button
    - expect: List is sorted in ascending order by name
    - expect: Sort arrow icon changes direction
  3. Click the 氏名 column header button again
    - expect: List is sorted in descending order by name

### 3. Patient Search

**Seed:** `tests/patients/seed.spec.ts`

#### 3.1. Search by patient email returns matching results

**File:** `tests/patients/patient-search.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Full patient list is displayed
  2. Type a known email address (e.g. marloint.test+SiddeshBeluraR14SecondNewUser@alconlabs.com) into the search field
    - expect: Search field accepts input
  3. Click the 検索 (Search) button
    - expect: Patient list is filtered to show only matching records
    - expect: The matching patient 'Belura Vinagar' is visible in results
    - expect: Patient count in heading updates to reflect the number of results

#### 3.2. Search by patient name (Katakana) returns matching results

**File:** `tests/patients/patient-search.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Full patient list is displayed
  2. Type a partial Katakana name into the search field
    - expect: Search field accepts Katakana input
  3. Click the 検索 button
    - expect: List is filtered to patients whose name matches the Katakana query

#### 3.3. Search with no matching results shows empty state

**File:** `tests/patients/patient-search.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Full patient list is displayed
  2. Type a non-existent email or name into the search field and click 検索
    - expect: Patient list shows no results or an empty state message
    - expect: Patient count shows (0) in the heading

#### 3.4. Clearing search restores full patient list

**File:** `tests/patients/patient-search.spec.ts`

**Steps:**
  1. Perform a search that returns a subset of patients
    - expect: Filtered results are shown
  2. Clear the search field and click 検索
    - expect: Full patient list is restored
    - expect: Patient count returns to original total (e.g. 99)

### 4. Patient Filters

**Seed:** `tests/patients/seed.spec.ts`

#### 4.1. Filter by registration status 登録済 (Registered) shows only registered patients

**File:** `tests/patients/patient-filters.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed with 'すべて (All)' selected by default in Registration Status filter
  2. Click the '登録済' radio button under 登録状況 filter
    - expect: Patient list is filtered
    - expect: All displayed patients show 登録済 status in their registration status column
    - expect: Patients with other statuses (未登録, 登録待ち, etc.) are not visible

#### 4.2. Filter by registration status 未登録 (Unregistered) shows only unregistered patients

**File:** `tests/patients/patient-filters.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the '未登録' radio button under 登録状況 filter
    - expect: Patient list is filtered to show only unregistered patients
    - expect: All displayed rows show 未登録 registration status

#### 4.3. Filter by prescription status 有効 (Valid) shows only patients with valid prescriptions

**File:** `tests/patients/patient-filters.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed with prescription filter set to すべて (All)
  2. Click the '有効' radio button under 指示書 filter
    - expect: Patient list filters to patients with valid prescriptions
    - expect: Prescription column shows 有効 for all visible patients

#### 4.4. Filter by prescription status なし (None) shows patients without prescriptions

**File:** `tests/patients/patient-filters.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the 'なし' radio button under 指示書 filter
    - expect: Patient list shows only patients with no prescription on record
    - expect: Prescription column shows '-' for all visible patients

#### 4.5. Combined filters: Registered status + Valid prescription

**File:** `tests/patients/patient-filters.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed with all filters at default
  2. Select '登録済' in registration status filter AND '有効' in prescription filter
    - expect: Patient list is filtered by both criteria
    - expect: All visible patients are 登録済 AND have 有効 prescription
    - expect: Count heading updates accordingly

### 5. Patient Row – Context Menu Actions

**Seed:** `tests/patients/seed.spec.ts`

#### 5.1. More menu displays correct options

**File:** `tests/patients/patient-row-actions.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the 'more' (︙) button on any patient row
    - expect: A context menu appears with exactly 3 options: ユーザー情報を編集する (Edit user info), 単品注文 (Individual order), 指示書を作成する (Create prescription)
  3. Press Escape
    - expect: The context menu is dismissed without any action taken

#### 5.2. More menu – Individual order navigates to order creation

**File:** `tests/patients/patient-row-actions.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the 'more' button on a registered patient row and select '単品注文'
    - expect: User is navigated to the individual order creation page for that patient

#### 5.3. More menu – Create prescription opens prescription form

**File:** `tests/patients/patient-row-actions.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the 'more' button on a patient row and select '指示書を作成する'
    - expect: Prescription creation form or page opens for that patient

### 6. Patient Detail Page

**Seed:** `tests/patients/seed.spec.ts`

#### 6.1. Clicking patient name navigates to patient detail page

**File:** `tests/patients/patient-detail.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click on a patient name link (e.g. 'Belura Vinagar')
    - expect: User navigates to the patient detail page at /mas/patients/{uuid}
    - expect: Page title includes the patient's name
    - expect: Patient info section is visible with phone, email, MARLO ID fields
    - expect: Main address section is shown
    - expect: Registration status is displayed
    - expect: Customer ID section is visible

#### 6.2. Patient detail page displays correct tabs

**File:** `tests/patients/patient-detail.spec.ts`

**Steps:**
  1. Navigate to a patient detail page
    - expect: Four tabs are visible: 指示書 (Prescriptions), 注文一覧 (Order list), 定期デリバリー (Regular delivery), クーポン (Coupon)
    - expect: 指示書 tab is selected by default

#### 6.3. Prescriptions tab shows prescription cards with correct details

**File:** `tests/patients/patient-detail.spec.ts`

**Steps:**
  1. Navigate to a patient detail page that has prescriptions (e.g. Belura Vinagar)
    - expect: 指示書 tab is active by default
  2. Verify prescription card content
    - expect: Each card shows: status badge (有効/無効), 指示書登録日 (registration date), 更新 (update date), 有効期間 (expiry date), 期間 (duration)
    - expect: Right eye (OD) details shown: product name, BC, DIA, PWR, 購入可能箱数
    - expect: Left eye (OS) details shown: product name, BC, DIA, PWR, 購入可能箱数
    - expect: Action buttons visible: 定期デリバリープラン設定, 代理注文, 編集

#### 6.4. Back button on patient detail page returns to patient list

**File:** `tests/patients/patient-detail.spec.ts`

**Steps:**
  1. Navigate to a patient detail page
    - expect: Patient detail page is displayed with a 戻る (Back) button
  2. Click the 戻る button
    - expect: User returns to the patients list page at /mas/patients
    - expect: Patient list is displayed

#### 6.5. Date range filter on prescriptions tab filters prescription cards

**File:** `tests/patients/patient-detail.spec.ts`

**Steps:**
  1. Navigate to a patient detail page with multiple prescriptions
    - expect: 指示書 tab is active, multiple prescription cards are visible
  2. Click the date range picker and select a narrow date range (e.g. single month)
    - expect: Prescription cards are filtered to only show prescriptions within the selected date range
    - expect: Cards outside the date range are hidden

### 7. Register New Patient

**Seed:** `tests/patients/seed.spec.ts`

#### 7.1. Register User button opens New Patient modal

**File:** `tests/patients/register-patient.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: Patient list is displayed
  2. Click the 'ユーザー登録' (Register User) button
    - expect: A dialog with title '新規ユーザー追加' (Add New User) opens
    - expect: ユーザー情報 (User information) section is visible
    - expect: 住所（メイン）(Main address) section is visible
    - expect: Required fields are marked with *
    - expect: Cancel (キャンセル) and Save (保存) buttons are present
    - expect: Save button is disabled by default

#### 7.2. Closing the Register User modal without saving discards the form

**File:** `tests/patients/register-patient.spec.ts`

**Steps:**
  1. Open the 新規ユーザー追加 modal
    - expect: Modal is visible
  2. Click the close (×) button or the キャンセル button
    - expect: Modal is dismissed
    - expect: Patient list is displayed unchanged
    - expect: No new patient is added

#### 7.3. Save button remains disabled when required fields are empty

**File:** `tests/patients/register-patient.spec.ts`

**Steps:**
  1. Open the 新規ユーザー追加 modal
    - expect: Modal is open with empty fields
  2. Do not fill in any fields
    - expect: 保存 (Save) button remains disabled
    - expect: Form cannot be submitted

### 8. Page Tabs Navigation

**Seed:** `tests/patients/seed.spec.ts`

#### 8.1. 指示書 tab on patients list page displays prescriptions view

**File:** `tests/patients/tabs-navigation.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: ユーザー管理 tab is selected by default
  2. Click the '指示書' tab
    - expect: Tab becomes selected
    - expect: Content area updates to show a prescriptions list view
    - expect: URL or page content reflects the 指示書 tab context

#### 8.2. MARLO定期デリバリー tab displays regular delivery plans view

**File:** `tests/patients/tabs-navigation.spec.ts`

**Steps:**
  1. Log in and navigate to /mas/patients?h=myPatients
    - expect: ユーザー管理 tab is active
  2. Click the 'MARLO定期デリバリー' tab
    - expect: Tab becomes selected
    - expect: Content area updates to show MARLO regular delivery plans
    - expect: Relevant delivery plan data or empty state is displayed

#### 8.3. Switching back to ユーザー管理 tab restores the patient list

**File:** `tests/patients/tabs-navigation.spec.ts`

**Steps:**
  1. Navigate to 指示書 or MARLO定期デリバリー tab
    - expect: That tab content is shown
  2. Click the ユーザー管理 tab
    - expect: Patient list is displayed again with search, filters, and patient rows intact
