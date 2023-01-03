<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230112024233 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE report_selectable_field_option_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE report_file_field_file_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE report_field_file_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE report_field_option_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE report_field_file (id BIGINT NOT NULL, report_file_id BIGINT DEFAULT NULL, file_id BIGINT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8C117391F352046C ON report_field_file (report_file_id)');
        $this->addSql('CREATE INDEX IDX_8C11739193CB796C ON report_field_file (file_id)');
        $this->addSql('COMMENT ON COLUMN report_field_file.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field_file.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field_file.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_field_option (id BIGINT NOT NULL, report_selectable_field_id BIGINT DEFAULT NULL, name VARCHAR(255) NOT NULL, is_selected BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, position INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7EA81C2BA55D6AC7 ON report_field_option (report_selectable_field_id)');
        $this->addSql('COMMENT ON COLUMN report_field_option.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field_option.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field_option.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE report_field_file ADD CONSTRAINT FK_8C117391F352046C FOREIGN KEY (report_file_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_file ADD CONSTRAINT FK_8C11739193CB796C FOREIGN KEY (file_id) REFERENCES file (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_option ADD CONSTRAINT FK_7EA81C2BA55D6AC7 FOREIGN KEY (report_selectable_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_file_field_file DROP CONSTRAINT fk_85f0531f352046c');
        $this->addSql('ALTER TABLE report_file_field_file DROP CONSTRAINT fk_85f053193cb796c');
        $this->addSql('ALTER TABLE report_selectable_field_option DROP CONSTRAINT fk_8e3a1d27a55d6ac7');
        $this->addSql('DROP TABLE report_file_field_file');
        $this->addSql('DROP TABLE report_selectable_field_option');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE report_field_file_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE report_field_option_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE report_selectable_field_option_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE report_file_field_file_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE report_file_field_file (id BIGINT NOT NULL, report_file_id BIGINT DEFAULT NULL, file_id BIGINT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_85f053193cb796c ON report_file_field_file (file_id)');
        $this->addSql('CREATE INDEX idx_85f0531f352046c ON report_file_field_file (report_file_id)');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_selectable_field_option (id BIGINT NOT NULL, report_selectable_field_id BIGINT DEFAULT NULL, name VARCHAR(255) NOT NULL, is_selected BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, "position" INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_8e3a1d27a55d6ac7 ON report_selectable_field_option (report_selectable_field_id)');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE report_file_field_file ADD CONSTRAINT fk_85f0531f352046c FOREIGN KEY (report_file_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_file_field_file ADD CONSTRAINT fk_85f053193cb796c FOREIGN KEY (file_id) REFERENCES file (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_selectable_field_option ADD CONSTRAINT fk_8e3a1d27a55d6ac7 FOREIGN KEY (report_selectable_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field_file DROP CONSTRAINT FK_8C117391F352046C');
        $this->addSql('ALTER TABLE report_field_file DROP CONSTRAINT FK_8C11739193CB796C');
        $this->addSql('ALTER TABLE report_field_option DROP CONSTRAINT FK_7EA81C2BA55D6AC7');
        $this->addSql('DROP TABLE report_field_file');
        $this->addSql('DROP TABLE report_field_option');
    }
}
