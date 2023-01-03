<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230112201730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE report_field_record (report_field_id BIGINT NOT NULL, record_id BIGINT NOT NULL, PRIMARY KEY(report_field_id, record_id))');
        $this->addSql('CREATE INDEX IDX_BF1A830A44579ECD ON report_field_record (report_field_id)');
        $this->addSql('CREATE INDEX IDX_BF1A830A4DFD750C ON report_field_record (record_id)');
        $this->addSql('CREATE TABLE report_field_record_exclusion (report_field_id BIGINT NOT NULL, record_id BIGINT NOT NULL, PRIMARY KEY(report_field_id, record_id))');
        $this->addSql('CREATE INDEX IDX_33D1779844579ECD ON report_field_record_exclusion (report_field_id)');
        $this->addSql('CREATE INDEX IDX_33D177984DFD750C ON report_field_record_exclusion (record_id)');
        $this->addSql('ALTER TABLE report_field_record ADD CONSTRAINT FK_BF1A830A44579ECD FOREIGN KEY (report_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_record ADD CONSTRAINT FK_BF1A830A4DFD750C FOREIGN KEY (record_id) REFERENCES record (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_record_exclusion ADD CONSTRAINT FK_33D1779844579ECD FOREIGN KEY (report_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_record_exclusion ADD CONSTRAINT FK_33D177984DFD750C FOREIGN KEY (record_id) REFERENCES record (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE file ADD file_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD storage_key_original VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD storage_key VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD storage_key_thumbnail VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD original_filename VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD upload_device VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE file ADD is_archived BOOLEAN DEFAULT false NOT NULL');
        $this->addSql('ALTER TABLE report_field ALTER filter DROP DEFAULT');
        $this->addSql('DROP INDEX idx_8c11739193cb796c');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8C11739193CB796C ON report_field_file (file_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE report_field_record DROP CONSTRAINT FK_BF1A830A44579ECD');
        $this->addSql('ALTER TABLE report_field_record DROP CONSTRAINT FK_BF1A830A4DFD750C');
        $this->addSql('ALTER TABLE report_field_record_exclusion DROP CONSTRAINT FK_33D1779844579ECD');
        $this->addSql('ALTER TABLE report_field_record_exclusion DROP CONSTRAINT FK_33D177984DFD750C');
        $this->addSql('DROP TABLE report_field_record');
        $this->addSql('DROP TABLE report_field_record_exclusion');
        $this->addSql('ALTER TABLE file DROP file_type');
        $this->addSql('ALTER TABLE file DROP storage_key_original');
        $this->addSql('ALTER TABLE file DROP storage_key');
        $this->addSql('ALTER TABLE file DROP storage_key_thumbnail');
        $this->addSql('ALTER TABLE file DROP original_filename');
        $this->addSql('ALTER TABLE file DROP upload_device');
        $this->addSql('ALTER TABLE file DROP is_archived');
        $this->addSql('ALTER TABLE report_field ALTER filter SET DEFAULT \'{}\'');
        $this->addSql('DROP INDEX UNIQ_8C11739193CB796C');
        $this->addSql('CREATE INDEX idx_8c11739193cb796c ON report_field_file (file_id)');
    }
}
